/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TextService } from './text.service';
import { Model } from 'mongoose';
import { Text } from './schemas/text.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('TextService', () => {
  let service: TextService;
  let model: Model<Text>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TextService,
        {
          provide: getModelToken(Text.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TextService>(TextService);
    model = module.get<Model<Text>>(getModelToken(Text.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a text entry', async () => {
      const mockText = { content: 'Test Content', username: 'user1' };
      jest.spyOn(model, 'create').mockResolvedValue(mockText as any);

      const result = await service.create(mockText);
      expect(result).toEqual(mockText);
      expect(model.create).toHaveBeenCalledWith(mockText);
    });
  });

  describe('findAll', () => {
    it('should get all text entries', async () => {
      const mockTexts = [{ content: 'Hello', username: 'user1' }];
      jest.spyOn(model, 'find').mockResolvedValue(mockTexts as any);

      const result = await service.findAll();
      expect(result).toEqual(mockTexts);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should get a single text by ID', async () => {
      const mockText = { content: 'Hello', username: 'user1' };
      jest.spyOn(model, 'findById').mockResolvedValue(mockText as any);

      const result = await service.findOne('1');
      expect(result).toEqual(mockText);
      expect(model.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a text entry', async () => {
      const updatedText = { content: 'Updated', username: 'user1' };
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockResolvedValue(updatedText as any);

      const result = await service.update('1', updatedText);
      expect(result).toEqual(updatedText);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', updatedText, {
        new: true,
      });
    });
  });

  describe('remove', () => {
    it('should delete a text entry', async () => {
      const deletedResult = { deleted: true };
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValue(deletedResult as any);

      const result = await service.remove('1');
      expect(result).toEqual(deletedResult);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});
