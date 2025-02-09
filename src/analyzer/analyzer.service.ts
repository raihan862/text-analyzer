// analyzer.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Text, TextDocument } from '../text/schemas/text.schema';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { IAnalizerRequetType } from './interfaces';

@Injectable()
export class AnalyzerService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(Text.name) private textModel: Model<TextDocument>,
  ) {}

  async getAnalyzedData(id: string, type: IAnalizerRequetType) {
    const cacheKey = `${id}:${type}`;
    console.log(cacheKey);

    const cachedData = await this.cacheManager.get(cacheKey);
    const allkey = await this.cacheManager.get('*');
    console.log(allkey);

    // Return data from Redis if found
    if (cachedData) {
      console.log('hit', cachedData);

      return cachedData;
    }
    console.log('not in redis');

    // If not in Redis, fetch from MongoDB
    const textData = await this.textModel.findById(id).exec();
    if (!textData) {
      throw new NotFoundException(`Text with ID ${id} not found`);
    }

    const analyzedData = textData[type];

    // Cache the data in Redis for future requests
    await this.cacheManager.set(cacheKey, analyzedData, 4 * 60 * 60);

    return analyzedData;
  }
}
