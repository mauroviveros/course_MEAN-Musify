import { Injectable } from '@nestjs/common';
import { AuthResponseDto, SignInAuthDto, SignUpAuthDto } from './dto/auth.dto';
import { UserService } from 'modules/user/user.service';
import { User } from 'modules/user/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(user: SignInAuthDto): Promise<AuthResponseDto> {
    console.log(user);
    return { token: 'token' };
  }

  async signUp(user: SignUpAuthDto): Promise<AuthResponseDto> {
    try {
      const response = await this.userService.create(user as User);
      console.log('response', response);
      return { token: 'token' };
    } catch (error) {
      throw error;
    }
  }
}
