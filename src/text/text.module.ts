import { Global, Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Text, TextSchema } from './schemas/text.schema';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Text.name, schema: TextSchema }]),
  ],
  controllers: [TextController],
  providers: [TextService],
  exports: [TextService],
})
export class TextModule {}
