import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (request, rawJwtToken, done) => {
        try {
          // In production, fetch Clerk JWKS and verify signature
          // For now, we'll decode and validate the token
          const decoded = JSON.parse(Buffer.from(rawJwtToken.split('.')[1], 'base64').toString());
          return done(null, decoded);
        } catch (error) {
          return done(error, undefined);
        }
      },
    });
  }

  async validate(payload: any) {
    // Find user by clerkUserId and include organization
    const user = await this.prisma.user.findUnique({
      where: { clerkUserId: payload.sub },
      include: { organization: true },
    });

    if (!user || !user.isActive) {
      throw new Error('User not found or inactive');
    }

    return {
      userId: user.id,
      clerkUserId: user.clerkUserId,
      role: user.role,
      organizationId: user.organizationId,
      organization: user.organization,
    };
  }
}
