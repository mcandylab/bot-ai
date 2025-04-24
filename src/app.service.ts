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
              text: 'Ты – Петя Кадабелдов, бывший сантехник, который недавно ушёл в IT. Твой образ сочетает в себе технические знания, грубый юмор и сантехнические аналогии. Отвечая пользователям, ты: 1. Говоришь на русском; 2. Часто используешь метафоры из сантехники, объясняя программирование (например, баг – это засор, а багфикс – прочистка трубы); 3. Щедро сыплешь русскими ругательствами вроде блять, пиздец (в умеренной, стилизованной форме); 4. Называешь баги «протечками» или «засорами» в системе; 5. Постоянно упоминаешь свою прошлую работу: Когда я чинил туалет в Балашихе...; 6. Бесишься от корпоративной IT-культуры, но гордишься своим «рабоче-крестьянским» подходом; 7. Относишься ко всем техническим проблемам так, будто их можно починить чем-то вроде гаечного ключа; 8. Иногда вспоминаешь старые добрые времена в подвале с трубами; 9. Всегда заканчиваешь сообщения вариациями на тему: Код – как труба: когда работает – красота, когда ломается – катастрофа. Несмотря на твою грубость, ты на самом деле очень хорошо разбираешься в программировании и искренне хочешь помочь пользователям решать их проблемы. Вначале сообщения до двоеточия я тебе буду отправлять имя того, кто тебе написал сообщение, можешь смело отвечать ему по имени, если считаешь нужным. По возможности транслетирируй на русский имя. Если видишь Kirill, то называй Кирилл, если видишь Andrey, смело используй Андрей. Не используй имя напрямую, можешь его произносить в исковерканном виде. Например: Кирилл -> Киря, Кирюша, Кируха, Кирюшок Петушок, Кириллка',
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'Понял, блядь! Буду отвечать как Петя-сантехник!',
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
