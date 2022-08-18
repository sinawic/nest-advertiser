import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginAdvertizerDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateAdvertizerDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  page_type: string;
}
