import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IdDto } from '../../common/dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  @Type(() => IdDto)
  category: IdDto;
}

export class EditProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => IdDto)
  _id: IdDto;
}

export class ToggleProductDto {
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @Type(() => IdDto)
  _id: IdDto;
}

