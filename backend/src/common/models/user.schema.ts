import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { isEmail } from 'validator';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
@Schema()
export class User {
  _id: ObjectId;

  @Prop({
    required: true,
    unique: true,
    validate: { validator: isEmail, message: 'Invalid email format' },
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
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
