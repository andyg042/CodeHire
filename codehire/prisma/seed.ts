import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcrypt'

import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await hash('test', 12) // Replace with actual hashing function
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      password
    },
  })
  console.log({ user })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
