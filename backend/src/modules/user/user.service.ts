import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../common/models/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async findOne(email: string): Promise<User> {
    return await this.model.findOne({ email });
  }

  async create(body: User): Promise<User> {
    const user = new this.model(body);
    return await user.save();
  }
}
