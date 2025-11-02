
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const {
    raffleId,
    customerName,
    customerPhone,
    customerEmail,
    ticketQuantity,
    paymentProofUrl,
    paymentMethod,
  } = body

  try {
    const raffle = await prisma.raffle.findUnique({
      where: { id: raffleId },
    })

    if (!raffle) {
      return NextResponse.json({ error: 'Raffle not found.' }, { status: 404 })
    }

    const totalAmount = raffle.ticketPrice * ticketQuantity

    const purchase = await prisma.purchase.create({
      data: {
        raffleId,
        customerName,
        customerPhone,
        customerEmail,
        ticketQuantity,
        paymentProofUrl,
        totalAmount,
        paymentMethod, // This should be dynamic
        status: 'pending',
      },
    })
    return NextResponse.json(purchase, { status: 201 })
  } catch (error) {
    console.error('Failed to create purchase', error)
    return NextResponse.json({ error: 'Failed to create purchase.' }, { status: 500 })
  }
}
