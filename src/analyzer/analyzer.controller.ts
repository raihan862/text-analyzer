// analyzer.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyzerService } from './analyzer.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TextOwnerGuard } from 'src/gaurds/text-owner.gaurd';

@UseGuards(ThrottlerGuard)
@UseGuards(TextOwnerGuard)
@Controller('analyzer')
export class AnalyzerController {
  constructor(private readonly analyzerService: AnalyzerService) {}

  @Get('word-count/:id')
  async getWordCount(@Param('id') id: string) {
    return this.analyzerService.getAnalyzedData(id, 'wordCount');
  }

  @Get('char-count/:id')
  async getCharCount(@Param('id') id: string) {
    return this.analyzerService.getAnalyzedData(id, 'charCount');
  }

  @Get('sentence-count/:id')
  async getSentenceCount(@Param('id') id: string) {
    return this.analyzerService.getAnalyzedData(id, 'sentenceCount');
  }

  @Get('paragraph-count/:id')
  async getParagraphCount(@Param('id') id: string) {
    return this.analyzerService.getAnalyzedData(id, 'paragraphCount');
  }

  @Get('longest-word/:id')
  async getLongestWord(@Param('id') id: string) {
    return this.analyzerService.getAnalyzedData(id, 'longestWord');
  }
}
