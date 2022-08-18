import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MarketerCampaignPriceDocument = MarketerCampaignPrice & Document;

@Schema()
export class MarketerCampaignPrice {
  @Prop({ required: true })
  price: number;
}

export const MarketerCampaignPriceSchema = SchemaFactory.createForClass(MarketerCampaignPrice)