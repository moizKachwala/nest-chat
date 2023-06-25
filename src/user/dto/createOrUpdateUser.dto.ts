import { IsString, IsEmail, Length } from 'class-validator';

export class CreateOrUpdateUserDto {
  @IsString()
  @Length(1, 50)
  firstname: string;

  @IsString()
  @Length(1, 50)
  lastname: string;

  @IsString()
  @Length(4, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  roleId: number;
}
