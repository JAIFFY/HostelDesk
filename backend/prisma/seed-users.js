import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const password = 'HostelDesk@2026!';

async function main() {
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email: 'student@hosteldesk.demo' },
    update: { passwordHash },
    create: {
      name: 'Aarav Mehta',
      email: 'student@hosteldesk.demo',
      passwordHash,
      role: 'STUDENT',
      studentId: 'STU-1001',
      roomNumber: 'B-204',
      hostelBlock: 'B'
    }
  });

  await prisma.user.upsert({
    where: { email: 'warden@hosteldesk.demo' },
    update: { passwordHash },
    create: {
      name: 'Rajiv Sharma',
      email: 'warden@hosteldesk.demo',
      passwordHash,
      role: 'WARDEN'
    }
  });

  await prisma.user.upsert({
    where: { email: 'admin@hosteldesk.demo' },
    update: { passwordHash },
    create: {
      name: 'HostelDesk Admin',
      email: 'admin@hosteldesk.demo',
      passwordHash,
      role: 'ADMIN'
    }
  });

  console.log('Demo users created/updated successfully.');
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});