import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";

const DAVINCI_MODEL = "text-davinci-003";
const CHAT_GPT_MODEL = "gpt-3.5-turbo-0301";
const DEFAULT_TEMPERATURE = 0.7;

@Injectable()
export class ChatGptAiService {
    private readonly openai: OpenAIApi;

    constructor() {
        const configuration = new Configuration({
            organization: process.env.OPENAI_API_ORGANIZATION_ID,
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    async getModelAnswer(question: string) {
        try {
            const params: CreateCompletionRequest = {
                prompt: question,
                model:  DAVINCI_MODEL,
                temperature: DEFAULT_TEMPERATURE
            }

            const response = await this.openai.createCompletion(params);
            console.log({response});
            return response.data;
            
        } catch (error) {
            console.log({error});
        }
    }

    async getModelAnswerGPT(question: string) {
        try {
            const completion = await this.openai.createChatCompletion({
                model: CHAT_GPT_MODEL,
                messages: [
                    {role: "assistant", content: question},
                ],
                temperature: DEFAULT_TEMPERATURE,
            });

            return JSON.parse(completion.data.choices[0].message.content);
        } catch (error) {
            
        }
    }
}
