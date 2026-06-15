import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "../decorators/publicRoute.decorator";
import { TokenPayloadType } from "src/auth/auth.types";

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private config: ConfigService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) return true
        const req = context.switchToHttp().getRequest()
        const authHeader = req.cookies?.accessToken
        if (!authHeader) {
            throw new UnauthorizedException("Missing authorization header");
        }

        const accessToken = authHeader

       

        try {
            let payload: TokenPayloadType;
            payload = await this.jwtService.verifyAsync(accessToken, {
                secret: this.config.get<string>("JWT_ACCESS_SECRET"),
            });
            req.user = payload
            return true
        } catch {
            throw new UnauthorizedException("Invalid access token.");
        }
    }
}