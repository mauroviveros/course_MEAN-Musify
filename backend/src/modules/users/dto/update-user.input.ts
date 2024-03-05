import { UsersCreateInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(UsersCreateInput) {
  @Field(() => Int)
  id: number;
}
