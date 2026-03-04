"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwks = (0, jwks_rsa_1.default)({
        jwksUri: process.env.CLERK_JWKS_URL || "",
        cache: true,
        rateLimit: true
    });
    constructor(prisma) {
        this.prisma = prisma;
    }
    getSigningKey(kid) {
        return new Promise((resolve, reject) => {
            this.jwks.getSigningKey(kid, (err, key) => {
                if (err)
                    return reject(err);
                const signingKey = key?.getPublicKey();
                if (!signingKey)
                    return reject(new Error("No public key"));
                resolve(signingKey);
            });
        });
    }
    async verifyAndLoadUser(bearerToken) {
        const token = bearerToken.replace(/^Bearer\s+/i, "").trim();
        if (!token)
            throw new common_1.UnauthorizedException("Missing token");
        const decodedHeader = jsonwebtoken_1.default.decode(token, { complete: true });
        const kid = decodedHeader && typeof decodedHeader === "object" ? decodedHeader.header.kid : null;
        if (!kid)
            throw new common_1.UnauthorizedException("Invalid token header");
        const signingKey = await this.getSigningKey(kid);
        let payload;
        try {
            payload = jsonwebtoken_1.default.verify(token, signingKey, {
                issuer: process.env.CLERK_ISSUER
            });
        }
        catch (e) {
            throw new common_1.UnauthorizedException("Invalid token");
        }
        const clerkUserId = payload?.sub;
        if (!clerkUserId)
            throw new common_1.UnauthorizedException("Missing sub");
        const user = await this.prisma.user.findUnique({ where: { clerkUserId } });
        if (!user || !user.isActive) {
            // For provision endpoint, we allow unprovisioned users
            throw new common_1.UnauthorizedException("User not provisioned");
        }
        return {
            clerkUserId,
            userId: user.id,
            organizationId: user.organizationId,
            role: user.role
        };
    }
    async verifyTokenOnly(bearerToken) {
        const token = bearerToken.replace(/^Bearer\s+/i, "").trim();
        if (!token)
            throw new common_1.UnauthorizedException("Missing token");
        const decodedHeader = jsonwebtoken_1.default.decode(token, { complete: true });
        const kid = decodedHeader && typeof decodedHeader === "object" ? decodedHeader.header.kid : null;
        if (!kid)
            throw new common_1.UnauthorizedException("Invalid token header");
        const signingKey = await this.getSigningKey(kid);
        let payload;
        try {
            payload = jsonwebtoken_1.default.verify(token, signingKey, {
                issuer: process.env.CLERK_ISSUER
            });
        }
        catch (e) {
            throw new common_1.UnauthorizedException("Invalid token");
        }
        const clerkUserId = payload?.sub;
        if (!clerkUserId)
            throw new common_1.UnauthorizedException("Missing sub");
        return { clerkUserId };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
