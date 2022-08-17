import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateMarketerCampaignPriceDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;
}



