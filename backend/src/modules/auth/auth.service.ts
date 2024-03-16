import { Injectable } from '@nestjs/common';
import { UserService } from 'modules/user/user.service';

import { User } from '@model/user.schema';
import {
  AuthResponseDto,
  SignInAuthDto,
  SignUpAuthDto,
} from '@model/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(body: SignInAuthDto): Promise<AuthResponseDto> {
    const { _id, role } = await this.userService.findOne(body.email);
    const token = await this.jwtService.signAsync({ sub: { _id, role } });
    return { token };
  }

  async signUp(body: SignUpAuthDto): Promise<AuthResponseDto> {
    const user = await this.userService.create(body as User);
    return this.signIn(user);
  }
}
