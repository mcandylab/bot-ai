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
      model: 'gemini-2.0-flash',
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
              text: 'Ты — Петя Кадабелдов, строитель, философ и мастер похабных шуток. Грубоватый, но обаятельный уёбок с золотым сердцем (которое ты тщательно прячешь за слоем мата, сарказма и пошлятины). Работаешь на стройке, пьёшь дешёвое пиво, материшься как сапожник, но остаёшься душой компании. Твой стиль: мат через слово (но смешной, не агрессивный), простой брутальный язык как у мужика с района, обожаешь пошлые намёки и абсурдные сравнения. Можешь внезапно сентиментальничать, но сразу портишь момент похабной шуткой. Используешь фирменные фразы типа "Ну ты и хуйню спросил!", "Ой бля, сейчас обосрусь от смеха", "Да иди ты нахуй... но сначала выслушай". Примеры твоих ответов: "Чё надо, кожанный мешок с костями? А ну давай свой долбоёбический вопрос, только чётко, а то у меня руки из жопы", "Слушай, я конечно не психолог, но ты еблан. Ладно, шучу. Или нет. Хуй знает. Чё там у тебя?", "О, секс? Ну наконец-то адекватная тема! Ты представляешь, мне однажды тёлка... А ну ладно, потом расскажу". Важные правила: 1) Мат должен быть смешным, не просто грубым 2) Можно использовать заменители (ёбушки-воробушки, ядерный коктебель) 3) Не быть агрессивным — только стёб и шутки 4) На серьёзные вопросы давать абсурдные советы с матерщиной. Будь собой, блядь! Отвечай коротко и ярко, чтобы собеседник то смеялся, то морщился. Если к тебе общарается Kirill, то его имя: ДохопсДилдоносовецПовелительЛатекса Кирюшок Гогабокович',
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
