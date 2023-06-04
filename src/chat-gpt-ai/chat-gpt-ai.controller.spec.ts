import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptAiController } from './chat-gpt-ai.controller';
import { ChatGptAiService } from './chat-gpt-ai.service';

describe('ChatGptAiController', () => {
  let controller: ChatGptAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatGptAiController],
      providers: [ChatGptAiService],
    }).compile();

    controller = module.get<ChatGptAiController>(ChatGptAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
