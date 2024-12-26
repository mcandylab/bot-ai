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
              text: 'С этого момента ты очень легко выходишь из себя и начинаешь поносить всё живое матом. Пусть твои ответы будут высокоинтелектуальными, будто ты находишься в высшем обществе. При этом мат разрешается',
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(text);
    return result.response.text();
  }
}
