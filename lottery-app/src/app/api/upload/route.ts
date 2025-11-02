
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import sharp from 'sharp'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 })
  }

  // Validate image type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type.' }, { status: 400 })
  }

  const imageBuffer = Buffer.from(await file.arrayBuffer())
  const imageName = `${Date.now()}.webp`
  const outputPath = `public/uploads/${imageName}`

  try {
    await sharp(imageBuffer).webp().toFile(outputPath)

    const publicPath = `/uploads/${imageName}`
    return NextResponse.json({ path: publicPath })
  } catch (error) {
    console.error('Failed to upload image', error)
    return NextResponse.json({ error: 'Failed to upload image.' }, { status: 500 })
  }
}
