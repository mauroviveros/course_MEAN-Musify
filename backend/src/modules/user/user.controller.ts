import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':_id')
  async findOne(@Param('_id') id: string): Promise<User> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.service.create(user);
  }
}
