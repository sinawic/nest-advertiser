import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class JoinBuyLinkDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  count: number;

  @IsString()
  @IsNotEmpty()
  code: string;
}
