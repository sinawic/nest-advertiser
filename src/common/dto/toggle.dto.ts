import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IdDto } from './_id.dto';

export class ToggleDto {
  @IsBoolean()
  @IsNotEmpty()
  state: boolean;

  @Type(() => IdDto)
  _id: IdDto;
}

export class StateChangeDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @Type(() => IdDto)
  _id: IdDto;
}
