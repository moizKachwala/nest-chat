// permission.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Role } from '../role/role.entity';

@Entity({ name: 'Permissions' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];
}
