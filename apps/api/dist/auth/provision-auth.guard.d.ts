import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";
export declare class ProvisionAuthGuard implements CanActivate {
    private auth;
    constructor(auth: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
