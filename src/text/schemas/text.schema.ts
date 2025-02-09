import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TextDocument = HydratedDocument<Text>;

@Schema({ timestamps: true })
export class Text {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  wordCount: number;
  @Prop()
  charCount: number;
  @Prop()
  sentenceCount: number;
  @Prop()
  paragraphCount: number;
  @Prop()
  longestWord: string;
}

export const TextSchema = SchemaFactory.createForClass(Text);
