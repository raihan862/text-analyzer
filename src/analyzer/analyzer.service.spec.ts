// analyzer.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzerService } from './analyzer.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { Text } from '../text/schemas/text.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('AnalyzerService', () => {
  let service: AnalyzerService;
  let cacheManager: Cache;
  let textModel: Model<Text>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyzerService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
        {
          provide: getModelToken(Text.name),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AnalyzerService>(AnalyzerService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
    textModel = module.get<Model<Text>>(getModelToken(Text.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAnalyzedData', () => {
    it('should return data from Redis if available', async () => {
      const id = '123';
      const type = 'wordCount';
      const cachedData = 10;

      jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedData);

      const result = await service.getAnalyzedData(id, type);
      expect(result).toBe(cachedData);
      expect(cacheManager.get).toHaveBeenCalledWith(`${id}:${type}`);
    });

    it('should fetch data from MongoDB if not in Redis', async () => {
      const id = '123';
      const type = 'wordCount';
      const analyzedData = { wordCount: 10 };

      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(textModel, 'findById').mockResolvedValue({
        analyzedData,
      });

      const result = await service.getAnalyzedData(id, type);
      expect(result).toBe(analyzedData[type]);
      expect(cacheManager.set).toHaveBeenCalledWith(
        `${id}:${type}`,
        analyzedData[type],
        { ttl: 3600 },
      );
    });

    it('should throw an error if text is not found in MongoDB', async () => {
      const id = '123';
      const type = 'wordCount';

      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(textModel, 'findById').mockResolvedValue(null);

      await expect(service.getAnalyzedData(id, type)).rejects.toThrow(
        'Text not found',
      );
    });
  });
});
