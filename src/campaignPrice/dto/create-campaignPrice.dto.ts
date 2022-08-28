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

export class CreateCampaignPriceDto {
  @IsNumber()
  @IsNotEmpty()
  day_price: number;

  @IsNumber()
  @IsNotEmpty()
  marketer_price: number;

  @IsNumber()
  @IsNotEmpty()
  product_price: number;

  // share link fields only
  @IsNumber()
  @IsOptional()
  link_price: number;
  // 

  @IsString()
  @IsNotEmpty()
  campaign_type: string;

  @IsNotEmpty()
  @Type(() => IdDto)
  level: IdDto;
}

export class EditCampaignPriceDto {
  @IsNumber()
  @IsNotEmpty()
  day_price: number;

  @IsNumber()
  @IsNotEmpty()
  marketer_price: number;

  @IsNumber()
  @IsNotEmpty()
  product_price: number;

  @IsString()
  @IsNotEmpty()
  campaign_type: string;

  @Type(() => IdDto)
  level: IdDto;

  @Type(() => IdDto)
  _id: IdDto;
}


