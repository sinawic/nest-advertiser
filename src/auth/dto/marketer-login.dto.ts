import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IdDto } from '../../common/dto';

export class LoginMarketerDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateMarketerDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  page_type: string;

  @IsOptional()
  @Type(() => IdDto)
  parent: IdDto;
}
