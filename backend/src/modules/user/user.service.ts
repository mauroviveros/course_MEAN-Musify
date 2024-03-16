import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../common/models/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async findOne(email: string): Promise<User> {
    const user = await this.model.findOne({ email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(body: User): Promise<User> {
    const user = new this.model(body);
    return await user.save();
  }
}
