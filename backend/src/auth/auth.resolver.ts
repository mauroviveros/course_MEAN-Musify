import { Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Auth } from '@model/auth.model';
// import { User } from './user.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Auth)
  async auth_login(): Promise<Auth> {
    return;
  }
}
