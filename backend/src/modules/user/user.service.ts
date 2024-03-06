import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findById(id);
  }

  async create(body: User): Promise<User> {
    const user = new this.model(body);
    console.log(user);
    return await user.save();
  }
}
