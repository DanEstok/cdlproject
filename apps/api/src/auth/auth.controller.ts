import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }

  @Post('validate')
  validateToken(@Body() body: { token: string }) {
    return this.authService.validateToken(body.token);
  }
}
