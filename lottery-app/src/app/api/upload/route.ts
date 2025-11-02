
import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import formidable from 'formidable'
import sharp from 'sharp'
import { NextApiRequest } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextApiRequest) {
  const form = formidable({})

  try {
    const [fields, files] = await form.parse(req)

    const file = files.file[0]

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 })
    }

    // Validate image type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.mimetype)) {
      return NextResponse.json({ error: 'Invalid file type.' }, { status: 400 })
    }

    const imagePath = file.filepath
    const imageName = `${Date.now()}.webp`
    const outputPath = `public/uploads/${imageName}`

    await sharp(imagePath).webp().toFile(outputPath)

    // Clean up the temporary file
    await fs.unlink(imagePath)

    const publicPath = `/uploads/${imageName}`
    return NextResponse.json({ path: publicPath })
  } catch (error) {
    console.error('Failed to upload image', error)
    return NextResponse.json({ error: 'Failed to upload image.' }, { status: 500 })
  }
}
