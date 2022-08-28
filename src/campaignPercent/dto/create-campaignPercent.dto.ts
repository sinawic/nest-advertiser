import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IdDto } from '../../common/dto';

export class CreateCampaignPercentDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  marketer_percent: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  p_marketer_percent: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  admin_percent: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  advertizer_percent: number;

  // share link fields only
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  link_admin_percent: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  link_marketer_percent: number;
  // 

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


