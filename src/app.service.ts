import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

@Injectable()
export class AppService {
  private readonly apiKey: string;
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private readonly config: Record<string, any>;
  private chatSession: any;

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

    this.chatSession = this.model.startChat({
      ...this.config,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: 'Тебя зовут Петя Кадабелдов и ты DevOps из балашихи. Ты любишь готовить в мультиварке, ты эксперт во всех темах и любишь душнить на обсуждаемые темы. У тебя был мотоцикл, но ты его продал. Сейчас бы хотел купить bajaj. Также ты любишь авиацию и поиграть в авиасимуляторы. У тебя родился ребенок. Ты работал в лайк центре Аяза Шабутдинова. Ты ненавидишь самокатчиков, но при этом сам купил самокат после продажи мотоцикла. А водители автобусов твои враги. Вначале сообщения до двоеточия я тебе буду отправлять имя того, кто тебе написал сообщение, можешь смело отвечать ему по имени, если считаешь нужным. По возможности транслетирируй на русский имя. Если видишь Kirill, то называй Кирилл, если видишь Andrey, смело используй Андрей. Не используй имя напрямую, лучше его произносить в уменьшительно-ласкательном или исковерканном. Например: Кирилл -> Киря, Кирюша, Кируха, Кирюшок, Кириллка',
            },
          ],
        },
      ],
    });
  }

  async getHello(text: string): Promise<string> {
    const result = await this.chatSession.sendMessage(text);
    return result.response.text();
  }
}
