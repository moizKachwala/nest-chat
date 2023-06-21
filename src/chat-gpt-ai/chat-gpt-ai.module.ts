import { Module } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { OpenAIService } from 'src/openai/openai.service';
import {EngineFactory} from 'src/openai/engines/engine.factory';
import { ChatGptAiController } from './chat-gpt-ai.controller';
import { TextDavinciEngine } from 'src/openai/engines/text-davinci-engine';
import { Gpt35TurboEngine } from 'src/openai/engines/gpt35-turbo-engine';
import { OpenAIEngine } from 'src/openai/engines/openai-engine.interface';

@Module({
  controllers: [ChatGptAiController],
  providers: [ChatGptAiService, OpenAIService, EngineFactory, {
    provide: 'ENGINES',
    useFactory: async () => {
      const engines: Record<string, OpenAIEngine> = {};
      engines['text-davinci-003'] = new TextDavinciEngine();
      engines['gpt-3.5-turbo-0301'] = new Gpt35TurboEngine();
      return engines;
    },
  }]
})
export class ChatGptAiModule {}
