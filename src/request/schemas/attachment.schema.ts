import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AttachmentDocument = Attachment & Document;

@Schema()
export class Attachment {
  @Prop({ required: true })
  originalname: string;

  @Prop({ required: true })
  encoding: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true, ref: 'request' })
  request: mongoose.Schema.Types.ObjectId;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment)