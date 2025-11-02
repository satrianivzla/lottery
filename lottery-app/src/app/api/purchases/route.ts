
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const {
    raffleId,
    customerName,
    customerPhone,
    customerEmail,
    ticketQuantity,
    paymentProofUrl,
  } = body

  try {
    const purchase = await prisma.purchase.create({
      data: {
        raffleId,
        customerName,
        customerPhone,
        customerEmail,
        ticketQuantity,
        paymentProofUrl,
        totalAmount: 0, // This should be calculated based on the raffle's ticket price
        paymentMethod: 'pago_movil', // This should be dynamic
        status: 'pending',
      },
    })
    return NextResponse.json(purchase, { status: 201 })
  } catch (error) {
    console.error('Failed to create purchase', error)
    return NextResponse.json({ error: 'Failed to create purchase.' }, { status: 500 })
  }
}
