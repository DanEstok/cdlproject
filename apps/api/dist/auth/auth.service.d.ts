import { PrismaService } from "../prisma/prisma.service";
export type AuthedUser = {
    clerkUserId: string;
    userId: string;
    organizationId: string;
    role: string;
};
export declare class AuthService {
    private prisma;
    private jwks;
    constructor(prisma: PrismaService);
    private getSigningKey;
    verifyAndLoadUser(bearerToken: string): Promise<AuthedUser>;
    verifyTokenOnly(bearerToken: string): Promise<{
        clerkUserId: string;
    }>;
}
