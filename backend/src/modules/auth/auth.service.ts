import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'modules/user/user.service';

import { User } from '@model/user.schema';
import {
  AuthResponseDto,
  SignInAuthDto,
  SignUpAuthDto,
} from '@model/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(body: SignInAuthDto): Promise<AuthResponseDto> {
    const { _id, role, password } = await this.userService.findOne(body.email);

    if (!(await bcrypt.compare(body.password, password))) {
      throw new UnauthorizedException('Invalid login credentials.');
    }

    const token = await this.jwtService.signAsync({ sub: { _id, role } });
    return { token };
  }

  async signUp({ password, ...body }: SignUpAuthDto): Promise<AuthResponseDto> {
    const salt = await bcrypt.genSalt();
    const hash = password ? await bcrypt.hash(password, salt) : undefined;

    await this.userService.create({ password: hash, ...body } as User);
    return this.signIn({ password, email: body.email });
  }
}
