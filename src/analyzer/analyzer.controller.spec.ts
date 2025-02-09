/* eslint-disable @typescript-eslint/unbound-method */
// analyzer.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzerController } from './analyzer.controller';
import { AnalyzerService } from './analyzer.service';

describe('AnalyzerController', () => {
  let controller: AnalyzerController;
  let service: AnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyzerController],
      providers: [
        {
          provide: AnalyzerService,
          useValue: {
            getAnalyzedData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AnalyzerController>(AnalyzerController);
    service = module.get<AnalyzerService>(AnalyzerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getWordCount', () => {
    it('should return word count', async () => {
      const id = '123';
      const wordCount = 10;

      jest.spyOn(service, 'getAnalyzedData').mockResolvedValue(wordCount);

      const result = await controller.getWordCount(id);
      expect(result).toBe(wordCount);
      expect(service.getAnalyzedData).toHaveBeenCalledWith(id, 'wordCount');
    });
  });
  describe('getCharCount', () => {
    it('should return char count', async () => {
      const id = '123';
      const charCount = 20;

      jest.spyOn(service, 'getAnalyzedData').mockRejectedValueOnce(charCount);

      const result = await controller.getCharCount(id);
      expect(result).toBe(charCount);
      expect(service.getAnalyzedData).toHaveBeenCalledWith(id, 'charCount');
    });
  });

  describe('getSentenceCount', () => {
    it('should return sentence count', async () => {
      const id = '123';
      const sentenceCount = 5;

      jest
        .spyOn(service, 'getAnalyzedData')
        .mockRejectedValueOnce(sentenceCount);

      const result = await controller.getSentenceCount(id);
      expect(result).toBe(sentenceCount);
      expect(service.getAnalyzedData).toHaveBeenCalledWith(id, 'sentenceCount');
    });
  });

  describe('getParagraphCount', () => {
    it('should return paragraph count', async () => {
      const id = '123';
      const paragraphCount = 3;

      jest
        .spyOn(service, 'getAnalyzedData')
        .mockRejectedValueOnce(paragraphCount);

      const result = await controller.getParagraphCount(id);
      expect(result).toBe(paragraphCount);
      expect(service.getAnalyzedData).toHaveBeenCalledWith(
        id,
        'paragraphCount',
      );
    });
  });

  describe('getLongestWord', () => {
    it('should return longest word', async () => {
      const id = '123';
      const longestWord = 'hello';

      jest.spyOn(service, 'getAnalyzedData').mockRejectedValueOnce(longestWord);

      const result = await controller.getLongestWord(id);
      expect(result).toBe(longestWord);
      expect(service.getAnalyzedData).toHaveBeenCalledWith(id, 'longestWord');
    });
  });
});
