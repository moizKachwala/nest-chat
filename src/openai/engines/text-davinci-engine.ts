import { Injectable } from '@nestjs/common';
import { OpenAIEngine } from './openai-engine.interface';
import { Configuration, OpenAIApi } from "openai";

const DAVINCI_MODEL = "text-davinci-003";
const DEFAULT_TEMPERATURE = 0.7;

@Injectable()
export class TextDavinciEngine implements OpenAIEngine {

  private readonly openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
        organization: process.env.OPENAI_API_ORGANIZATION_ID,
        apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async completePrompt(prompt: string, maxTokens: number = 250, numChoices: number = 10): Promise<string> {
    const response = await this.openai.createCompletion({
      model: DAVINCI_MODEL,
      temperature: DEFAULT_TEMPERATURE,
      max_tokens: maxTokens,
      prompt: prompt,
      n: numChoices,
    });

    const completion = JSON.stringify(response.data);
    return completion;
  }
}
