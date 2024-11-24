import { PrismaClient } from '@prisma/client'

const prismaDbClient = new PrismaClient({
  log: ['query']
})


export { prismaDbClient }