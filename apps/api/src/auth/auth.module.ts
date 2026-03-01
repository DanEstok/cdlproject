import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClerkStrategy } from './clerk.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.CLERK_SECRET_KEY,
      signOptions: { algorithm: 'RS256' },
    }),
  ],
  providers: [AuthService, ClerkStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
