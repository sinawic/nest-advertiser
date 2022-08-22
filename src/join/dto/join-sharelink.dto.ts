import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class JoinShareLinkDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
