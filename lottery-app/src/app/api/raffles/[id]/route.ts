
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const raffle = await prisma.raffle.findUnique({
    where: { id },
  })
  if (raffle) {
    return NextResponse.json(raffle)
  }
  return NextResponse.json({ error: 'Raffle not found' }, { status: 404 })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const body = await request.json()
  const { name, description, totalTickets } = body
  const updatedRaffle = await prisma.raffle.update({
    where: { id },
    data: {
      name,
      description,
      totalTickets,
    },
  })
  return NextResponse.json(updatedRaffle)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  await prisma.raffle.delete({
    where: { id },
  })
  return new Response(null, { status: 204 })
}
