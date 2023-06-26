import { Controller, Get, Post, Put, Delete, Body, Param, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateOrUpdateUserDto } from './dto/createOrUpdateUser.dto';
import { User } from './user.entity';
import { plainToClass } from 'class-transformer';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateOrUpdateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserById(@Param('id') id: number): Promise<User | undefined> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: CreateOrUpdateUserDto): Promise<User | undefined> {
    const user = plainToClass(User, updateUserDto);
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
