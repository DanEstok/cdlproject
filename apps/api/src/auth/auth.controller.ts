import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("health")
  getHealth() {
    return { status: "ok" };
  }

  @Post("validate")
  @UseGuards(AuthGuard)
  validateToken(@Body() body: { token: string }) {
    return { valid: true };
  }
}
