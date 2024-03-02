import { Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World Musify';
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.authService.getAllUsers();
  }
}
