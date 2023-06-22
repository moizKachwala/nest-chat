import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/openai/openai.service';
// import { ChatCompletionRequestMessage, Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
// import { EssayModel } from './model/essayModel';

const DAVINCI_MODEL = "text-davinci-003";
const CHAT_GPT_MODEL = "gpt-3.5-turbo-0301";
// const DEFAULT_TEMPERATURE = 0.7;

@Injectable()
export class ChatGptAiService {
    constructor(private openAiService: OpenAIService) {
        // You can use the openAiService in your methods...
      }
    // private readonly openai: OpenAIApi;
    // earlierResponses: ChatCompletionRequestMessage[] = [];

    // constructor() {
    //     const configuration = new Configuration({
    //         organization: process.env.OPENAI_API_ORGANIZATION_ID,
    //         apiKey: process.env.OPENAI_API_KEY,
    //     });
    //     this.openai = new OpenAIApi(configuration);
    // }

    // storeResponse(role: string, content: string): void {
    //     const response: ChatResponse = { role, content };
    //     this.earlierResponses.push(response);
    //   }
    
    
    //   getEarlierResponses(): ChatResponse[] {
    //     return this.earlierResponses;
    //   }

    // async getModelAnswer(question: string) {
    //     try {
    //         const params: CreateCompletionRequest = {
    //             prompt: "Evaluate the essay and provide marks out of 10. Also, highlight any mistakes : family is God's greatest gift to all living beings on earth including human beings. A person without family and its love is never codmplete and happy. A family is one with whom you can shadre all your joys and sorrows. Family stands by you at the toughest situations in life.",
    //             model:  DAVINCI_MODEL,
    //             temperature: DEFAULT_TEMPERATURE
    //         }

    //         const response = await this.openai.createCompletion(params);
    //         return response.data;
            
    //     } catch (error) {
    //         console.log({error});
    //     }
    // }

    // async getModelAnswerGPT(question: string) {
    //     try {
    //         const completion = await this.openai.createChatCompletion({
    //             model: CHAT_GPT_MODEL,
    //             messages: [
    //                 {role: "assistant", content: question},
    //             ],
    //             temperature: DEFAULT_TEMPERATURE,
    //         });

    //         return JSON.parse(completion.data.choices[0].message.content);
    //     } catch (error) {
    //         console.log({error});
    //     }
    // }

    // async getEssayTitles() {
        
    //     try {
    //         // // if(this.earlierResponses.length > 0) {
                
    //         // // }
    //         // // const conversations = [
    //         // //     {role: "user", content: title},
    //         // // ];
    //         // this.storeResponse('assistant', title);
    //         if(this.earlierResponses.length < 1) {
    //             //const title = "give me 10 essay titles for grade 3 with detail hints and please return a JSON format response";
    //             const title = "give me 10 essay titles for grade 3 with detail hints in json array format";
    //             const requestMessage: ChatCompletionRequestMessage = {
    //                 role: 'user',
    //                 content: title,
    //             };
    //             this.earlierResponses.push(requestMessage);
    //         } else {
    //             //const title = "give me more essay titles and please return a JSON format response";
    //             const title = "give me more essay titles in json array format";
    //             const requestMessage: ChatCompletionRequestMessage = {
    //                 role: 'user',
    //                 content: title,
    //             };
    //             this.earlierResponses.push(requestMessage);
    //         }
    //         const completion = await this.openai.createChatCompletion({
    //             model: CHAT_GPT_MODEL,
    //             messages: this.earlierResponses,
    //             temperature: DEFAULT_TEMPERATURE,
    //         });
    //         const response = completion.data.choices[0].message.content;
    //         if(response) {
    //             const requestMessage: ChatCompletionRequestMessage = {
    //                 role: 'assistant',
    //                 content: response,
    //             };
    //             this.earlierResponses.push(requestMessage);
    //         }
    //         //console.log(response);
    //         //return JSON.parse(response);
    //         return response;
    //     } catch (error) {
    //         console.log({error});
    //     }
    // }

    // async validateMyEssay(essayRequest: EssayModel) {
    //     //const req = `validate and highlight gramatical mistakes in essay writing for topic -  ${essayRequest.title} below ${essayRequest.content} and return marks out of 10.`;
    //     //const req = `Could you please validate the content of my essay with title ${essayRequest.title} and rate it out of 10? Here is my essay: ${essayRequest.content}`;
    //     //const req = `Could you please check for mistakes in the content of my essay for topic ${essayRequest.title}. Here is my essay: ${essayRequest.content}`;
    //     const req = `Evaluate the essay with title ${essayRequest.title}. Also, highlight the mistakes in details : ${essayRequest.content}`;
    //     try {
    //         const completion = await this.openai.createChatCompletion({
    //             model: CHAT_GPT_MODEL,
    //             messages: [
    //                 {role: "assistant", content: req},
    //             ],
    //             temperature: DEFAULT_TEMPERATURE,
    //         });

    //         // console.log(completion.data.choices[0].message.content);
    //         return {
    //             response: completion.data.choices[0].message.content,
    //         }
    //     } catch (error) {
    //         console.log({error});
    //     }
    // }

    async getEssayTitles1() {
        const prompt = "give me 10 essay titles for grade 3 with detail hints in json array format";
        const response = await this.openAiService.generateChatResponse(prompt, DAVINCI_MODEL);
        return response;
    }
}
