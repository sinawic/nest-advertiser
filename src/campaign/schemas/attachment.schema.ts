import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CampaignPicDocument = CampaignPic & Document;

@Schema()
export class CampaignPic {
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

  @Prop({ required: true, ref: 'campaign' })
  campaign: mongoose.Schema.Types.ObjectId;
}

export const CampaignPicSchema = SchemaFactory.createForClass(CampaignPic)