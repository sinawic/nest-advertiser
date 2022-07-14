import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { IdDto } from './_id.dto';

export class ToggleDto {
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @Type(() => IdDto)
  _id: IdDto;
}
