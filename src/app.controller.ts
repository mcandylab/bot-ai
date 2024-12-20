import { Body, Controller, HttpStatus, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTextDto } from './dto/create-text.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async getHello(@Body() createTextDto: CreateTextDto): Promise<string> {
    const { text } = createTextDto;
    return await this.appService.getHello(text);
  }
}
