import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptAiModule } from './chat-gpt-ai/chat-gpt-ai.module';
import { ConfigModule } from '@nestjs/config';
// import { EngineFactory } from './openai/engines/engine.factory';
// import { TextDavinciEngine } from './openai/engines/text-davinci-engine';
// import { Gpt35TurboEngine } from './openai/engines/gpt35-turbo-engine';
// import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ChatGptAiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
