import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTextDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
