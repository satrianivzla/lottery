
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const raffles = await prisma.raffle.findMany()
  return NextResponse.json(raffles)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, description, totalTickets } = body
  const newRaffle = await prisma.raffle.create({
    data: {
      name,
      description,
      totalTickets,
    },
  })
  return NextResponse.json(newRaffle, { status: 201 })
}
