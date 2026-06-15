import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "../decorators/publicRoute.decorator";
import { ConfigService } from "@nestjs/config";
import { TokenPayloadType } from "src/auth/auth.types";


@Injectable()
export class RefreshTokenGuard implements CanActivate {
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
        const isRefreshTokenHandler = context.getHandler().name == "refreshToken"
        if (isPublic && !isRefreshTokenHandler) return true

        const req = context.switchToHttp().getRequest()
        const refreshToken = req.cookies?.refreshToken
        if (!refreshToken) throw new UnauthorizedException("Invalid refresh token.")



        try {
            let payload: TokenPayloadType;
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.config.get<string>("JWT_REFRESH_SECRET"),
            });
            req.user = payload
            return true
        } catch {
            throw new UnauthorizedException("Invalid refresh token.");
        }
    }
}