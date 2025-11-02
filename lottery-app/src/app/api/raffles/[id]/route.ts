
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const raffle = await prisma.raffle.findUnique({
    where: { id: parseInt(id) },
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
  const { id } = await params;
  const body = await request.json()
  const { name, description, totalTickets } = body
  const updatedRaffle = await prisma.raffle.update({
    where: { id: parseInt(id) },
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
  const { id } = await params;
  await prisma.raffle.delete({
    where: { id: parseInt(id) },
  })
  return new Response(null, { status: 204 })
}
