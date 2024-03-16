import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getTokenFromHeader(request.headers);

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload.sub;
    } catch (error) {
      console.log(error); //! check errors messages;
      throw new UnauthorizedException();
    }

    return true;
  }

  private getTokenFromHeader(headers: Headers): string | null {
    const [type, token] = headers['authorization']?.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  }
}
