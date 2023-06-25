import { PartialType } from '@nestjs/mapped-types';
import { CreateOrUpdateUserDto } from './createOrUpdateUser.dto';

export class UpdateUserDto extends PartialType(CreateOrUpdateUserDto) {}
