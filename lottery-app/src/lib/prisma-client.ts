
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient().$extends({
    query: {
        purchase: {
            async create({ args, query }) {
                args.data.customerName = args.data.customerName.trim()
                return query(args)
            },
        },
    },
})
