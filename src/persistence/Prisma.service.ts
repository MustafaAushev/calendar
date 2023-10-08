import { PrismaClient } from "@prisma/client"
import { EventEntity } from "./EventEntity"

export class EventsService {
    constructor(private prismaClient: PrismaClient ) {}

    async upsertEvents(events: EventEntity[]) {
        // id указан как уникальный ключ, легде делать пачкой апсерт - субд сама пропустит в случае конфликтов уникальности. 
        // А мы избавляемся от потребности писать логику проверки дублей
        return this.prismaClient.event.createMany({
            data: events,
            skipDuplicates: true
        })
    }

    async findEvents(options: {limit: number, page: number}) {
        const events = await this.prismaClient.event.findMany({
            take: options.limit + 1,
            skip: (options.page - 1) * options.limit
        });
    
        return {
            events: events.slice(0, options.limit),
            hasNextPage: events.length > options.limit,
        }
    }
}