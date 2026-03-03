import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Dev Organization"
    }
  });

  // This user is a placeholder. Replace clerkUserId with your real Clerk user id after first login.
  await prisma.user.upsert({
    where: { clerkUserId: "dev_clerk_user_id" },
    update: { organizationId: org.id, role: UserRole.ADMIN, isActive: true },
    create: {
      organizationId: org.id,
      clerkUserId: "dev_clerk_user_id",
      role: UserRole.ADMIN
    }
  });

  console.log("Seed complete.");
}

main().finally(async () => prisma.$disconnect());
