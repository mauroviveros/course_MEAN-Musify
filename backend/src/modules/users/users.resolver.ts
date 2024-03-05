import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { UsersService } from './users.service';

import { User } from '@model/user.model';
import { UsersCreateInput } from './dto/create-user.input';
// import { User } from './entities/user.entity';
// import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'users_create' })
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  create(@Args('user_createInput') user_createInput: UsersCreateInput) {
    console.log(user_createInput);
    return;
  }
}
