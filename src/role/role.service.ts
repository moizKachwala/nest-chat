import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/CreateRoleDto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async getRoleById(id: string): Promise<Role | undefined> {
    return this.roleRepository.findOneBy({id: parseInt(id)});
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }

  async updateRole(id: string, createRoleDto: CreateRoleDto): Promise<Role | undefined> {
    const existingRole = await this.roleRepository.findOneBy({id: parseInt(id)});
    if (!existingRole) {
      return undefined;
    }

    const updatedRole = Object.assign(existingRole, createRoleDto);
    return this.roleRepository.save(updatedRole);
  }

  async deleteRole(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
