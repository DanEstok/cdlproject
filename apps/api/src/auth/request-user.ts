export type RequestUser = {
  clerkUserId: string;
  userId: string;
  organizationId: string;
  role: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __dummy: unknown;
}

declare module "express" {
  interface Request {
    user?: RequestUser;
  }
}
