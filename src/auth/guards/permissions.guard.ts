// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
// import { UserRepository } from '../user.repository';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../user.entity';

// @Injectable()
// export class PermissionsGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     @InjectRepository(UserRepository)
//     private userRepository: UserRepository,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!requiredPermissions) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user: User = request.user;

//     const loadedUser = await this.userRepository.findOne(user.id, { relations: ['roles', 'roles.permissions'] });

//     if (!loadedUser) {
//       return false;
//     }

//     const userPermissions = loadedUser.roles
//       .flatMap((role) => role.permissions)
//       .map((permission) => permission.name);

//     const hasRequiredPermission = requiredPermissions.some((permission) => userPermissions.includes(permission));

//     return hasRequiredPermission;
//   }
// }
