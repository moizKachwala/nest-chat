// typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { Permission } from './permission/permission.entity';
import 'dotenv/config';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Role, Permission],
  synchronize: true,
};

export default config;
