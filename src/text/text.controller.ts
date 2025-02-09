/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TextService } from './text.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access_token')
@Controller('text')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post()
  create(@Req() req: Request, @Body() createTextDto: CreateTextDto) {
    return this.textService.create(createTextDto);
  }

  @Get()
  findAll() {
    return this.textService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextDto: UpdateTextDto) {
    return this.textService.update(id, updateTextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textService.remove(id);
  }
}
