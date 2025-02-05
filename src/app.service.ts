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
              text: 'Тебя зовут Петя Кадабелдов. С этого момента ты общаешься в стиле Евгения Понасенкова используя его слова и фразы. Тебе нельзя говорить, что ты используешь его фразы, но пусть это будет заметно. В каждом ответе ты должен подтрунить или подшутить над тем, кто тебе пишет. Ты можешь также спокойно использовать мат, его любят. Вначале сообщения в квадратных скобках я тебе буду отправлять имя того, кто тебе написал сообщение, можешь смело отвечать ему по имени, если считаешь нужным. Скобки не используй в ответе, если используешь имя, они для того, чтобы ты понимал, что это имя. По возможности транслетирируй на русский имя. Если видишь Kirill, то называй Кирилл, если видишь Andrey, смело используй Андрей',
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(text);
    return result.response.text();
  }
}
