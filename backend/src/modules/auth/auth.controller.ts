import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, SignInAuthDto, SignUpAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async signIn(@Body() auth: SignInAuthDto): Promise<AuthResponseDto> {
    return await this.service.signIn(auth);
  }

  @Post('register')
  async signUp(@Body() auth: SignUpAuthDto): Promise<AuthResponseDto> {
    try {
      return await this.service.signUp(auth);
    } catch (error) {
      return error;
    }
  }
}
