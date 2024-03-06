import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  avatar: string;

  @Prop({ enum: Role, default: Role.USER })
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
