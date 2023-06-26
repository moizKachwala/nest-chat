import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/CreateRoleDto';
import { Permission } from 'src/permission/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) { }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async getRoleById(id: number): Promise<Role | undefined> {
    return this.roleRepository.findOne({ where: { id: id }, relations: { permissions: true } });
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description, permissions } = createRoleDto;

    const role = new Role();
    role.name = name;
    role.description = description;

    if (permissions && permissions.length > 0) {
      const permissionEntities = await this.permissionRepository.findBy({ id: In(permissions) });
      role.permissions = permissionEntities;
    }

    return this.roleRepository.save(role);
  }

  async updateRole(id: number, createRoleDto: CreateRoleDto): Promise<Role | undefined> {
    const existingRole = await this.roleRepository.findOneBy({ id: id });
    if (!existingRole) {
      return undefined;
    }

    const { name, description, permissions } = createRoleDto;

    existingRole.name = name;
    existingRole.description = description;

    if (permissions && permissions.length > 0) {
      const permissionEntities = await this.permissionRepository.findBy({ id: In(permissions) });
      existingRole.permissions = permissionEntities;
    } else {
      existingRole.permissions = [];
    }

    return this.roleRepository.save(existingRole);
  }

  async deleteRole(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
