import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class JoinDiscountCodeDto {
  @IsString()
  @IsNotEmpty()
  user_unique_id: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
