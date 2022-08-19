import { IdDto } from '../../common/dto';
import { Type } from 'class-transformer';


export class AssignMarketerLevelDto {
  @Type(() => IdDto)
  level: IdDto;

  @Type(() => IdDto)
  _id: IdDto;
}
