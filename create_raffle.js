
const { PrismaClient } = require('./lottery-app/node_modules/@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.raffle.create({
    data: {
      name: 'Test Raffle',
      description: 'This is a test raffle.',
      totalTickets: 100,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
