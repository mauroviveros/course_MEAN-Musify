import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '@model/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<UserDocument>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.user.find();
  }
}
