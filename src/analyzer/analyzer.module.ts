import { Module } from '@nestjs/common';
import { AnalyzerService } from './analyzer.service';
import { AnalyzerController } from './analyzer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Text, TextSchema } from 'src/text/schemas/text.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Text.name, schema: TextSchema }]),
  ],
  controllers: [AnalyzerController],
  providers: [AnalyzerService],
})
export class AnalyzerModule {}
