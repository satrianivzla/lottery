
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs'
import { exec } from 'child_process'
import bcrypt from 'bcryptjs'
import util from 'util'

const execAsync = util.promisify(exec)

export async function POST(request: Request) {
  // Check if .env file already exists
  try {
    await fs.access('.env')
    return NextResponse.json({ error: 'Application is already installed.' }, { status: 403 })
  } catch (error) {
    // .env file does not exist, so we can proceed with installation
  }

  const body = await request.json()
  const {
    dbHost,
    dbPort,
    dbUser,
    dbPassword,
    dbName,
    adminEmail,
    adminPassword,
  } = body

  // 1. Create .env file
  const databaseUrl = `mysql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
  const envContent = `DATABASE_URL="${databaseUrl}"\n`
  try {
    await fs.writeFile('.env', envContent)
  } catch (error) {
    console.error('Failed to write .env file', error)
    return NextResponse.json({ error: 'Failed to create .env file.' }, { status: 500 })
  }

  // 2. Run Prisma migrations
  try {
    await execAsync('npx prisma db push --schema=prisma/schema.prisma')
  } catch (error) {
    console.error('Failed to run Prisma migrations', error)
    return NextResponse.json({ error: 'Failed to apply database migrations.' }, { status: 500 })
  }

  // 3. Create admin user
  try {
    const prisma = new PrismaClient()
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    })
    await prisma.$disconnect()
  } catch (error) {
    console.error('Failed to create admin user', error)
    return NextResponse.json({ error: 'Failed to create admin user.' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Installation successful!' })
}
