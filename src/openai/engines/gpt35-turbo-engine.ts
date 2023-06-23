import { Injectable } from '@nestjs/common';
import { OpenAIEngine } from './openai-engine.interface';
import { ChatCompletionRequestMessage, Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import { parseJsonResponse } from 'src/utils/jsonParser';

const CHAT_GPT_MODEL = "gpt-3.5-turbo-0301";
const DEFAULT_TEMPERATURE = 0.7;

@Injectable()
export class Gpt35TurboEngine implements OpenAIEngine {
  private readonly openai: OpenAIApi;
  private conversationHistory: ChatCompletionRequestMessage[];

  constructor() {
    const configuration = new Configuration({
      organization: process.env.OPENAI_API_ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
    this.conversationHistory = [];
  }

  async completePrompt(prompt: string): Promise<string> {
    this.conversationHistory.push({ role: 'user', content: prompt });

    const response = await this.openai.createChatCompletion({
      model: CHAT_GPT_MODEL,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...this.conversationHistory,
      ],
      temperature: DEFAULT_TEMPERATURE,
    });

    const completion = response.data.choices[0].message.content;
    this.conversationHistory.push({ role: 'assistant', content: completion });

    return parseJsonResponse(completion);
  }
}