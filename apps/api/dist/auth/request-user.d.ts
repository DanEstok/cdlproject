export type RequestUser = {
    clerkUserId: string;
    userId: string;
    organizationId: string;
    role: string;
};
declare global {
    var __dummy: unknown;
}
declare module "express" {
    interface Request {
        user?: RequestUser;
    }
}
