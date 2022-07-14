import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IdDto } from '../../common/dto';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @Type(() => IdDto)
  parent: IdDto;
}

export class EditCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => IdDto)
  _id: IdDto;
}


