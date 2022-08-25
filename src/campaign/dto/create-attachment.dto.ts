import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import mongoose from 'mongoose';

export class SaveFileDto {
  @IsString()
  @IsNotEmpty()
  fieldname: string

  @IsString()
  @IsNotEmpty()
  originalname: string

  @IsString()
  @IsNotEmpty()
  encoding: string

  @IsString()
  @IsNotEmpty()
  mimetype: string

  @IsString()
  @IsNotEmpty()
  destination: string

  @IsString()
  @IsNotEmpty()
  filename: string

  @IsString()
  @IsNotEmpty()
  path: string

  @IsNumber()
  @IsNotEmpty()
  size: number

  @IsObjectId()
  @IsNotEmpty()
  request: mongoose.Types.ObjectId;
}

export class CreateAttachmentDto {
  @IsString()
  @IsNotEmpty()
  fieldname: string

  @IsString()
  @IsNotEmpty()
  originalname: string

  @IsString()
  @IsNotEmpty()
  encoding: string

  @IsString()
  @IsNotEmpty()
  mimetype: string

  @IsString()
  @IsNotEmpty()
  destination: string

  @IsString()
  @IsNotEmpty()
  filename: string

  @IsString()
  @IsNotEmpty()
  path: string

  @IsNumber()
  @IsNotEmpty()
  size: number
}
