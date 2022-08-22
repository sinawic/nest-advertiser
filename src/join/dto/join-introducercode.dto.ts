import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class JoinIntroducerCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
