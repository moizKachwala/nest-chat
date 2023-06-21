import { Injectable, Optional, Inject } from '@nestjs/common';
import { OpenAIEngine } from './openai-engine.interface';

@Injectable()
export class EngineFactory {
  private readonly engines: Record<string, OpenAIEngine>;

  constructor(@Optional() @Inject('ENGINES') engines: Record<string, OpenAIEngine>) {
    this.engines = engines || {};
  }

  getEngine(engineType: string): OpenAIEngine {
    const engine = this.engines[engineType];
    if (!engine) {
      throw new Error(`Engine type '${engineType}' is not supported.`);
    }
    return engine;
  }
}
