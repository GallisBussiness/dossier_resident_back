import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PavillonService } from './pavillon.service';
import { CreatePavillonDto } from './dto/create-pavillon.dto';
import { UpdatePavillonDto } from './dto/update-pavillon.dto';

@Controller('pavillon')
export class PavillonController {
  constructor(private readonly pavillonService: PavillonService) {}

  @Post()
  create(@Body() createPavillonDto: CreatePavillonDto) {
    return this.pavillonService.create(createPavillonDto);
  }

  @Get()
  findAll() {
    return this.pavillonService.findAll();
  }

  @Get('byCampus/:id')
  findAllByCampus(@Param('id') id: string) {
    return this.pavillonService.findAllByCampus(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pavillonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePavillonDto: UpdatePavillonDto) {
    return this.pavillonService.update(id, updatePavillonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pavillonService.remove(id);
  }
}
