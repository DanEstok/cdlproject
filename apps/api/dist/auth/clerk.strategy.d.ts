import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma/prisma.service';
declare const ClerkStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class ClerkStrategy extends ClerkStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: any): Promise<{
        userId: string;
        clerkUserId: string;
        role: import("@prisma/client").$Enums.UserRole;
        organizationId: string;
        organization: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    }>;
}
export {};
