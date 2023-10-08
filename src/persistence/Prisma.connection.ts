import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const prisma = async () => {
    await prismaClient.$connect();
    console.log('Prisma connected')
    return prismaClient;
}
