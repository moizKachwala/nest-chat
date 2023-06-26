import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.permissionService.findById(id);
  }

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.permissionService.delete(id);
  }
}
