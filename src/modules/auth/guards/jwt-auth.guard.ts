import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import config from 'src/config/config';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.jwt_secret,
      });
      const credentials = await this.authService.getEnterpriseCredentials(
        payload.username,
      );
      if (!credentials || !credentials.enterprise) {
        throw new UnauthorizedException();
      }
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
