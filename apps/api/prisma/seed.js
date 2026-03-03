"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const org = await prisma.organization.upsert({
        where: { id: "00000000-0000-0000-0000-000000000001" },
        update: {},
        create: {
            id: "00000000-0000-0000-0000-000000000001",
            name: "Dev Organization"
        }
    });
    await prisma.user.upsert({
        where: { clerkUserId: "dev_clerk_user_id" },
        update: { organizationId: org.id, role: client_1.UserRole.ADMIN, isActive: true },
        create: {
            organizationId: org.id,
            clerkUserId: "dev_clerk_user_id",
            role: client_1.UserRole.ADMIN
        }
    });
    console.log("Seed complete.");
}
main().finally(async () => prisma.$disconnect());
//# sourceMappingURL=seed.js.map