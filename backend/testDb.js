const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const users = await prisma.user.findMany();
    console.log('Connection successful, found users:', users.length);
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

test();
