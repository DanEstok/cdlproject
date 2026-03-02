import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create default organization
  const org = await prisma.organization.upsert({
    where: { id: 'default-org' },
    update: {},
    create: {
      id: 'default-org',
      name: 'Default Organization',
    },
  });

  console.log('Created organization:', org);

  // Create a test user
  const user = await prisma.user.upsert({
    where: { clerkUserId: 'test-user' },
    update: {},
    create: {
      clerkUserId: 'test-user',
      role: 'CASE_MANAGER',
      organizationId: 'default-org',
    },
  });

  console.log('Created user:', user);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
