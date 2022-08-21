import {
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IdDto } from '../../common/dto';

export class JoinDto {
  @IsString()
  @Type(() => IdDto)
  campaign: IdDto;
}
