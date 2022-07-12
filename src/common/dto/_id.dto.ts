import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class IdDto {
  @Type(() => ObjectId)
  _id: string;
}
