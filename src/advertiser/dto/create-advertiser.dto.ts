import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IdDto } from '../../common/dto';
import { Type } from 'class-transformer';

export class CreateAdvertiserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  page: string;
}

export class EditAdvertiserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @Type(() => IdDto)
  _id: IdDto;
}

export class ActivateAdvertiserDto {
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @Type(() => IdDto)
  _id: IdDto;
}
