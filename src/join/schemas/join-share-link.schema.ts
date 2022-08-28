import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type JoinShareLinkDocument = JoinShareLink & Document;

@Schema()
export class JoinShareLink {
  @Prop({ default: new Date() })
  date: Date;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true, ref: 'campaign' })
  campaign: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: 'join' })
  join: mongoose.Schema.Types.ObjectId;
}

export const JoinShareLinkSchema = SchemaFactory.createForClass(JoinShareLink)
