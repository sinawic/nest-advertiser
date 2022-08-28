import {
  IsDate,
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

  // product fields
  @IsString()
  @IsOptional()
  product_title: string;

  @IsString()
  @IsOptional()
  product_description: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  product_price: number;
  // 

  // link fields
  @IsString()
  @IsOptional()
  link: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  click_count: number;
  // 

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
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // product fields
  @IsString()
  @IsOptional()
  product_title: string;

  @IsString()
  @IsOptional()
  product_description: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  product_price: number;
  // 

  // link fields
  @IsString()
  @IsOptional()
  link: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  click_count: number;
  // 

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

  @Type(() => IdDto)
  _id: IdDto;
}


