import { Injectable } from '@nestjs/common';
import { EngineFactory } from './engines/engine.factory';
import { OpenAIEngine } from './engines/openai-engine.interface';

@Injectable()
export class OpenAIService {
  constructor(private readonly engineFactory: EngineFactory) {}

  async generateChatResponse(prompt: string, engineType: string): Promise<string> {
    const openAIEngine: OpenAIEngine = this.engineFactory.getEngine(engineType);
    return openAIEngine.completePrompt(prompt);
  }
}