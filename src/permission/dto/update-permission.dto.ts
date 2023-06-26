import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePermissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
