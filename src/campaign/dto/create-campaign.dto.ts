import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinDate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IdDto } from '../../common/dto';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  product_count: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  marketer_count: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  start_date: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  end_date: Date;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  discount_usable_count: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  discount_percent: number;

  @IsString()
  @Type(() => IdDto)
  level: IdDto;
}

export class EditCampaignDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  product_count: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  marketer_count: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  start_date: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  end_date: Date;

  @IsOptional()
  @IsNumber()
  @Min(1)
  discount_usable_count: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  discount_percent: number;

  @IsString()
  @Type(() => IdDto)
  level: IdDto;

  @Type(() => IdDto)
  _id: IdDto;
}


