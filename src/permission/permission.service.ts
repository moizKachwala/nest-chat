import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findById(id: number): Promise<Permission> {
    return this.permissionRepository.findOneBy({id: id});
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionRepository.create(createPermissionDto);
    return this.permissionRepository.save(permission);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.permissionRepository.findOneBy({id: id});
    if (!permission) {
      throw new Error('Permission not found');
    }
    Object.assign(permission, updatePermissionDto);
    return this.permissionRepository.save(permission);
  }

  async delete(id: number): Promise<void> {
    const permission = await this.permissionRepository.findOneBy({id: id});
    if (!permission) {
      throw new Error('Permission not found');
    }
    await this.permissionRepository.remove(permission);
  }
}
