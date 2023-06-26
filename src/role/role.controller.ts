import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/CreateRoleDto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  async getRoleById(@Param('id') id: number): Promise<Role> {
    return this.roleService.getRoleById(id);
  }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(createRoleDto);
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<Role> {
    return this.roleService.updateRole(id, createRoleDto);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}
