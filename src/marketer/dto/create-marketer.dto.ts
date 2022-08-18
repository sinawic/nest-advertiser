import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IdDto } from '../../common/dto';
import { Type } from 'class-transformer';

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

  @Type(() => IdDto)
  parent: IdDto;

  @Type(() => IdDto)
  level: IdDto;
}

export class EditMarketerDto {
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

  @Type(() => IdDto)
  parent: IdDto;

  @Type(() => IdDto)
  level: IdDto;

  @Type(() => IdDto)
  _id: IdDto;
}
