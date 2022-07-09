import { PrismaClient } from '@prisma/client';
import { platforms } from './data';

const prisma = new PrismaClient();

const seedDatabase = async () => {
   await prisma.platform.deleteMany();
   await prisma.$queryRaw`ALTER TABLE Platform AUTO_INCREMENT = 1`;
   await prisma.platform.createMany({ data: platforms });
   console.log('Seeded Platforms');
}

seedDatabase()
   .catch(exception => {
      console.error(exception);
      process.exit(1);
   })
   .finally(() => prisma.$disconnect());