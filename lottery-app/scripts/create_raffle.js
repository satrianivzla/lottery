
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // First, delete any existing raffles to ensure a clean state
  console.log('Deleting existing raffles...');
  await prisma.raffle.deleteMany({});
  console.log('Existing raffles deleted.');

  console.log('Creating a new raffle...');
  const newRaffle = await prisma.raffle.create({
    data: {
      name: 'Mobile Test Raffle',
      description: 'This is a test raffle for mobile responsiveness.',
      totalTickets: 100,
      ticketPrice: 10,
    },
  });
  console.log(`New raffle created with ID: ${newRaffle.id}`);

  // Write the ID to a temp file
  const idFilePath = path.join('/tmp', 'raffle_id.txt');
  fs.writeFileSync(idFilePath, newRaffle.id.toString());
  console.log(`Raffle ID written to ${idFilePath}`);
}

main()
  .catch((e) => {
    console.error('An error occurred during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Disconnecting Prisma Client...');
    await prisma.$disconnect();
    console.log('Prisma Client disconnected.');
  });
