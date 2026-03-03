import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getHealth(): {
        status: string;
    };
    validateToken(body: {
        token: string;
    }): {
        valid: boolean;
    };
}
