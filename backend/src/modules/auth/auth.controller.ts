import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthResponseDto,
  SignInAuthDto,
  SignUpAuthDto,
} from '@model/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  signIn(@Body() auth: SignInAuthDto): Promise<AuthResponseDto> {
    return this.service.signIn(auth);
  }

  @Post('register')
  signUp(@Body() auth: SignUpAuthDto): Promise<AuthResponseDto> {
    return this.service.signUp(auth);
  }
}
