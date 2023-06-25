import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateOrUpdateUserDto } from './dto/CreateOrUpdateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateOrUpdateUserDto): Promise<User> {
    const user = plainToClass(User, createUserDto);
    await this.validateUser(user);
    return this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({id: id});
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const existingUser = await this.userRepository.findOneBy({id: id});
    if (!existingUser) {
      return undefined;
    }

    const updatedUser = plainToClass(User, { ...existingUser, ...updateUserDto });
    await this.validateUser(updatedUser);
    return this.userRepository.save(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private async validateUser(user: User): Promise<void> {
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors[0].constraints}`);
    }

    const existingUser = await this.userRepository.findOneBy({ username: user.username });
    if (existingUser) {
      throw new Error('Username is already taken');
    }
  }
}
