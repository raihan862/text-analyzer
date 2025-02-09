/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { TextController } from './text/text.controller';
import { TextService } from './text/text.service';

describe('TextController', () => {
  let controller: TextController;
  let service: TextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextController],
      providers: [
        {
          provide: TextService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TextController>(TextController);
    service = module.get<TextService>(TextService);
  });

  it('✅ should get all text entries', async () => {
    const mockTexts = [{ content: 'Hello', username: 'user1' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(mockTexts as any);

    expect(await controller.findAll()).toEqual(mockTexts);
  });
});
