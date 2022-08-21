import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ObjectionDateDocument = ObjectionDate & Document;

@Schema()
export class ObjectionDate {
  @Prop({ default: 1 })
  max_days: number;
}

export const ObjectionDateSchema = SchemaFactory.createForClass(ObjectionDate)