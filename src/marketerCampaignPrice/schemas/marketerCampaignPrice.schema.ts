import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LevelDocument = MarketerCampaignPrice & Document;

@Schema()
export class MarketerCampaignPrice {
  @Prop({ required: true })
  price: number;
}

export const MarketerCampaignPriceSchema = SchemaFactory.createForClass(MarketerCampaignPrice)