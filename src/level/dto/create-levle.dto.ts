import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IdDto } from '../../common/dto';

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class EditLevelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => IdDto)
  _id: IdDto;
}


