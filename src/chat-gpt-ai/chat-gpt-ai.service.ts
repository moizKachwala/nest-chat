import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/openai/openai.service';
import { EssayModel } from './model/essayModel';

const DAVINCI_MODEL = "text-davinci-003";
const CHAT_GPT_MODEL = "gpt-3.5-turbo-0301";

@Injectable()
export class ChatGptAiService {
    constructor(private openAiService: OpenAIService) { }
    
    async getEssayTitles() {
        const prompt = "give me 10 essay titles for grade 3 with detail hints in json array format.";
        try {
            const response = await this.openAiService.generateChatResponse(prompt, CHAT_GPT_MODEL);
            return response;

        } catch (error) {
            console.log({ error });
        }
    }

    async validateMyEssay(essayRequest: EssayModel) {
        const prompt = `Evaluate the essay with title ${essayRequest.title}. Also, highlight the mistakes in details : ${essayRequest.content}`;
        try {
            const response = await this.openAiService.generateChatResponse(prompt, CHAT_GPT_MODEL);
            return response;
        } catch (error) {
            console.log({ error });
        }
    }
}
