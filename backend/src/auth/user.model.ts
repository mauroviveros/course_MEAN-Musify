import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  surname: string;

  @Field()
  @Prop()
  image: string;

  @Field()
  @Prop({ enum: Role, default: Role.USER })
  role: string;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
