
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Middleware to trim whitespace from customerName on purchase creation
prisma.$use(async (params, next) => {
  if (params.model === 'Purchase' && params.action === 'create') {
    if (params.args.data.customerName) {
      params.args.data.customerName = params.args.data.customerName.trim()
    }
  }
  return next(params)
})

export default prisma
