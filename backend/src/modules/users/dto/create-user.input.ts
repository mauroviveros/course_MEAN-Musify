import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UsersCreateInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  role: string;
}
