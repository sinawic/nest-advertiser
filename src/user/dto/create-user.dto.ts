import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IdDto } from '../../common/dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class EditUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Type(() => IdDto)
  _id: IdDto;
}
