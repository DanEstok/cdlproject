"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    const org = await prisma.organization.upsert({
        where: { id: 'default-org' },
        update: {},
        create: {
            id: 'default-org',
            name: 'Default Organization',
        },
    });
    console.log('Created organization:', org);
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
//# sourceMappingURL=seed.old.js.map