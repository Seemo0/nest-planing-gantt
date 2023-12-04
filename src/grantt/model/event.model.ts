import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop()
  title: string;

  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop()
  createdBy: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
