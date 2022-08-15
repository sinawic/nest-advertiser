import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LevelDocument = Level & Document;

@Schema()
export class Level {
  @Prop({ required: true, index: true, unique: true })
  name: string;

  @Prop({ default: new Date() })
  date_created: Date;
}

export const LevelSchema = SchemaFactory.createForClass(Level)