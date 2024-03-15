import { Injectable } from '@nestjs/common';
import { UserService } from 'modules/user/user.service';

import { User } from '@model/user.schema';
import {
  AuthResponseDto,
  SignInAuthDto,
  SignUpAuthDto,
} from '@model/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(user: SignInAuthDto): Promise<AuthResponseDto> {
    console.log(user);
    return { token: 'token' };
  }

  async signUp(user: SignUpAuthDto): Promise<AuthResponseDto> {
    const response = await this.userService.create(user as User);
    console.log('response', response);
    return { token: 'token' };
  }
}
