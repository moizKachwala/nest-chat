// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { UserRepository } from '../user.repository';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../user.entity';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     @InjectRepository(UserRepository)
//     private userRepository: UserRepository,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!requiredRoles) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user: User = request.user;

//     const loadedUser = await this.userRepository.findOne(user.id, { relations: ['roles'] });

//     if (!loadedUser) {
//       return false;
//     }

//     const userRoles = loadedUser.roles.map((role) => role.name);
//     const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

//     return hasRequiredRole;
//   }
// }
