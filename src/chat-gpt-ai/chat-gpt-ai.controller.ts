import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { RequestModel } from './model/requestModel';
import { EssayModel } from './model/essayModel';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly chatGptAiService: ChatGptAiService) {}

  @Post("/message")
  getModelAnswer(@Body() data: RequestModel) {
    return this.chatGptAiService.getModelAnswer(data.question);
  }

  @Post("/messagegpt")
  getModelAnswerGPT(@Body() data: RequestModel) {
    return this.chatGptAiService.getModelAnswerGPT(data.question);
  }

  @Get("/listEssayTitles")
  getTitles() {
    return this.chatGptAiService.getEssayTitles();
  }

  @Post("/validateEssay")
  validateEssay(@Body() req: EssayModel) {
    return this.chatGptAiService.validateMyEssay(req);
  }
  
}
