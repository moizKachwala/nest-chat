import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'Roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Permission, {cascade: true})
  @JoinTable({name: 'RolePermissions'})
  permissions: Permission[];

  @OneToMany(() => User, user => user.role)
  users: User[];
}
