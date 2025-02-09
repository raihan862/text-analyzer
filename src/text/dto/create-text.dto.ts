/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTextDto {
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsOptional()
  username: string;
}
