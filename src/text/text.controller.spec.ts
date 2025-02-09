import { Test, TestingModule } from '@nestjs/testing';
import { TextController } from './text.controller';
import { TextService } from './text.service';
import { getModelToken } from '@nestjs/mongoose';
import { Text } from './schemas/text.schema';

describe('TextController', () => {
  let controller: TextController;
  let service: TextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextController],
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

    controller = module.get<TextController>(TextController);
    service = module.get<TextService>(TextService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
