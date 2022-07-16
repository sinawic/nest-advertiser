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

export class CreateRequestDto {
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

export class EditRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => IdDto)
  _id: IdDto;
}

