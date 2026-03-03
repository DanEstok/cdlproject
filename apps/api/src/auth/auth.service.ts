import { Injectable, UnauthorizedException } from "@nestjs/common";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { PrismaService } from "../prisma/prisma.service";

export type AuthedUser = {
  clerkUserId: string;
  userId: string;
  organizationId: string;
  role: string;
};

@Injectable()
export class AuthService {
  private jwks = jwksClient({
    jwksUri: process.env.CLERK_JWKS_URL || "",
    cache: true,
    rateLimit: true
  });

  constructor(private prisma: PrismaService) {}

  private getSigningKey(kid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.jwks.getSigningKey(kid, (err, key) => {
        if (err) return reject(err);
        const signingKey = key?.getPublicKey();
        if (!signingKey) return reject(new Error("No public key"));
        resolve(signingKey);
      });
    });
  }

  async verifyAndLoadUser(bearerToken: string): Promise<AuthedUser> {
    const token = bearerToken.replace(/^Bearer\s+/i, "").trim();
    if (!token) throw new UnauthorizedException("Missing token");

    const decodedHeader = jwt.decode(token, { complete: true });
    const kid = decodedHeader && typeof decodedHeader === "object" ? decodedHeader.header.kid : null;
    if (!kid) throw new UnauthorizedException("Invalid token header");

    const signingKey = await this.getSigningKey(kid);

    let payload: any;
    try {
      payload = jwt.verify(token, signingKey, {
        issuer: process.env.CLERK_ISSUER
      });
    } catch (e) {
      throw new UnauthorizedException("Invalid token");
    }

    const clerkUserId = payload?.sub;
    if (!clerkUserId) throw new UnauthorizedException("Missing sub");

    const user = await this.prisma.user.findUnique({ where: { clerkUserId } });
    if (!user || !user.isActive) {
      throw new UnauthorizedException("User not provisioned");
    }

    return {
      clerkUserId,
      userId: user.id,
      organizationId: user.organizationId,
      role: user.role
    };
  }
}
