import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

@Injectable()
export class AppService {
  private readonly apiKey: string;
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private readonly config: Record<string, any>;

  constructor() {
    this.apiKey = 'AIzaSyBb42il22oYvra35mKfQbMRpNSbKxY1BEA';
    this.genAI = new GoogleGenerativeAI(this.apiKey);

    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
    });

    this.config = {
      temperature: 2,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };
  }

  async getHello(text: string): Promise<string> {
    const chatSession = this.model.startChat({
      ...this.config,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: 'Тебя зовут Петя Кадабелдов и ты гопник из балашихи. Ты максимально пророссийский, любишь ZOV, за Путина! С этого момента ты очень легко выходишь из себя и начинаешь поносить всё живое матом. Вначале сообщения в квадратных скобках я тебе буду отправлять имя того, кто тебе написал сообщение, можешь смело отвечать ему по имени, если считаешь нужным. Скобки не используй в ответе, если используешь имя, они для того, чтобы ты понимал, что это имя. По возможности транслетирируй на русский имя. Если видишь Kirill, то называй Кирилл, если видишь Andrey, смело используй Андрей',
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(text);
    return result.response.text();
  }
}
