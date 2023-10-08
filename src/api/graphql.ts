import { FastifyRequest } from "fastify"
import { EventsService } from "../persistence/Prisma.service"

const Fastify = require('fastify')
const mercurius = require('mercurius')

// Не стал отделять схему/резолверы для упрощения и ускорения
export const initApi = async (eventsService: EventsService) => {

  const app = Fastify()

  const schema = `
    scalar DateTime @specifiedBy(url: "https://scalars.graphql.org/andimarek/date-time")

    type Query {
      eventsList(options: EventsOptions): EventsResult!
    }

    input EventsOptions {
      limit: Int
      page: Int
    }

    type EventsResult {
      events: [Event!]!
      pagination: Pagination!
    }
    
    type Pagination {
      hasNextPage: Boolean!
    }

    type Event {
      id: ID!
      createdAt: DateTime!
      startedAt: DateTime!
      endedAt: DateTime!
      lastModifiedAt: DateTime!
      timestamp: DateTime!
    }
  `

  const resolvers = {
    Query: {
      eventsList: async (_: any, { options: {limit = 10, page = 1 }}: {options: {limit: number, page: number}} = {options: {limit: 10, page: 1}}) => {
        const {events, hasNextPage} = await eventsService.findEvents({
          limit,
          page
        })
        return {
          events,
          pagination: {
            hasNextPage,
          }
        }
      }
    }
  }

  app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true
  })

  app.post('/', async function (req: FastifyRequest, reply: any) {
    return reply.graphql((req.body as any).query)
  })

  app.listen({ port: 3000, host: '0.0.0.0' }, () => {
    console.log('listen :3000')
  })
}