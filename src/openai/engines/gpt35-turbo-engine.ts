import { Injectable } from '@nestjs/common';
import { OpenAIEngine } from './openai-engine.interface';
import { ChatCompletionRequestMessage, Configuration, CreateCompletionRequest, OpenAIApi } from "openai";

const CHAT_GPT_MODEL = "gpt-3.5-turbo-0301";
const DEFAULT_TEMPERATURE = 0.7;

@Injectable()
export class Gpt35TurboEngine implements OpenAIEngine {
  private readonly openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
        organization: process.env.OPENAI_API_ORGANIZATION_ID,
        apiKey: process.env.OPENAI_API_KEY,
    });
    console.log({configuration});
    this.openai = new OpenAIApi(configuration);
  }

  async completePrompt(prompt: string): Promise<string> {
    
    const response = await this.openai.createChatCompletion({
      model: CHAT_GPT_MODEL,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: DEFAULT_TEMPERATURE,
    });

    const completion = response.data.choices[0].message.content;
    return completion;
  }
}