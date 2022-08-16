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

export class CreateCampaignPercentDto {
  @IsNumber()
  @IsNotEmpty()
  marketer_percent: number;

  @IsNumber()
  @IsNotEmpty()
  p_marketer_percent: number;

  @IsNumber()
  @IsNotEmpty()
  admin_percent: number;

  @IsNumber()
  @IsNotEmpty()
  advertizer_percent: number;

  @IsString()
  @IsNotEmpty()
  campaign_type: string;

  @IsNotEmpty()
  @Type(() => IdDto)
  level: IdDto;
}

export class EditCampaignPercentDto {
  @IsNumber()
  @IsNotEmpty()
  marketer_percent: number;

  @IsNumber()
  @IsNotEmpty()
  p_marketer_percent: number;

  @IsNumber()
  @IsNotEmpty()
  admin_percent: number;

  @IsNumber()
  @IsNotEmpty()
  advertizer_percent: number;

  @IsString()
  @IsNotEmpty()
  campaign_type: string;

  @IsNotEmpty()
  @Type(() => IdDto)
  level: IdDto;

  @Type(() => IdDto)
  _id: IdDto;
}


