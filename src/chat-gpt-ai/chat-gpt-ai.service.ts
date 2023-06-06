import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import { EssayModel } from './model/essayModel';

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
            console.log({error});
        }
    }

    async getEssayTitles() {
        const title = "give me 10 essay titles for grade 3 with detail hints in json format";
        try {
            const completion = await this.openai.createChatCompletion({
                model: CHAT_GPT_MODEL,
                messages: [
                    {role: "assistant", content: title},
                ],
                temperature: DEFAULT_TEMPERATURE,
            });

            return JSON.parse(completion.data.choices[0].message.content);
        } catch (error) {
            console.log({error});
        }
    }

    async validateMyEssay(essayRequest: EssayModel) {
        //const req = `validate essay writing for topic -  ${essayRequest.title} below ${essayRequest.content} and return marks out of 10. return response in JSON format`;
        //const req = `Could you please validate the content of my essay with title ${essayRequest.title} and rate it out of 10? Here is my essay: ${essayRequest.content}`;
        const req = `Could you please check for mistakes in the content of my essay for topic ${essayRequest.title} and give marks out of 10? Also check if the length of the essay is enough? Here is my essay: ${essayRequest.content}`;
        try {
            const completion = await this.openai.createChatCompletion({
                model: CHAT_GPT_MODEL,
                messages: [
                    {role: "assistant", content: req},
                ],
                temperature: DEFAULT_TEMPERATURE,
            });

            // console.log(completion.data.choices[0].message.content);
            return {
                response: completion.data.choices[0].message.content,
            }
        } catch (error) {
            console.log({error});
        }
    }
}
