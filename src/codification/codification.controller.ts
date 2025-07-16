import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CodificationService } from './codification.service';
import { CreateCodificationDto } from './dto/create-codification.dto';
import { UpdateCodificationDto } from './dto/update-codification.dto';

@Controller('codification')
export class CodificationController {
  constructor(private readonly codificationService: CodificationService) {}

  @Post()
  create(@Body() createCodificationDto: CreateCodificationDto) {
    return this.codificationService.create(createCodificationDto);
  }

  @Get()
  findAll() {
    return this.codificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCodificationDto: UpdateCodificationDto) {
    return this.codificationService.update(+id, updateCodificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codificationService.remove(+id);
  }
}
