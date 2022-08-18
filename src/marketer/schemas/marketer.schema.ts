import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MarketerDocument = Marketer & Document;

@Schema()
export class Marketer {
  @Prop({ required: true, index: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ required: true })
  page: string;

  @Prop({ required: true })
  page_type: string;

  @Prop({ required: false, ref: 'marketer' })
  parent: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false, ref: 'level' })
  level: mongoose.Schema.Types.ObjectId;

  @Prop({ default: new Date() })
  date_created: Date;
}

export const MarketerSchema = SchemaFactory.createForClass(Marketer)