// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from '../decorators/roles.decorator';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> {
//     const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
//     if (!roles) {
//       return true; // No roles defined, allow access
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     const userRole = user.role.name; // Assuming a single role for each user

//     return roles.includes(userRole);
//   }
// }
