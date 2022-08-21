import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateObjectionDateDto {
  @IsNumber()
  @IsNotEmpty()
  max_days: number;
}



