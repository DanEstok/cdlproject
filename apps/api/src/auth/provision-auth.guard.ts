import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class ProvisionAuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers["authorization"] as string | undefined;
    if (!authHeader) throw new UnauthorizedException("Missing Authorization header");

    const authed = await this.auth.verifyTokenOnly(authHeader);
    req.user = authed;

    return true;
  }
}
