import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Text } from './schemas/text.schema';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { textAnalyzer } from 'src/units/textAnalyzer';
import { ITextAnalizerResponse } from './interfaces';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { analyzerKeys } from './constants';

@Injectable()
export class TextService {
  constructor(
    @InjectModel(Text.name) private textModel: Model<Text>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(textDto: CreateTextDto) {
    const { content } = textDto;
    const formatedData: ITextAnalizerResponse = textAnalyzer(content);
    const result = await this.textModel.create({ ...formatedData, ...textDto });
    Object.entries(formatedData).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.cacheManager.set(`${result.id}:${key}`, value);
    });

    return result;
  }

  async findAll() {
    return this.textModel.find();
  }

  async findOne(id: string) {
    return this.textModel.findById(id);
  }

  async update(id: string, textDto: UpdateTextDto) {
    const { content } = textDto;
    const formatedData: ITextAnalizerResponse = textAnalyzer(content);
    const result = this.textModel.findByIdAndUpdate(id, textDto, { new: true });
    Object.entries(formatedData).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.cacheManager.set(`${id}:${key}`, value);
    });
    return result;
  }

  async remove(id: string) {
    const result = await this.textModel.findByIdAndDelete(id);
    analyzerKeys.forEach((key) => {
      this.cacheManager.del(`${id}:${key}`);
    });

    return result;
  }
}
