import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SelectionneService } from './selectionne.service';
import { CreateSelectionneDto } from './dto/create-selectionne.dto';
import { UpdateSelectionneDto } from './dto/update-selectionne.dto';
import { InscriptionService } from 'src/inscription/inscription.service';

@Controller('selectionne')
export class SelectionneController {
  constructor(private readonly selectionneService: SelectionneService, private inscriptionService: InscriptionService) {}

  @Post()
  async create(@Body() createSelectionneDto: CreateSelectionneDto) {
    const s = await this.selectionneService.create(createSelectionneDto);
    // await this.inscriptionService.update(s.inscription._id,{is_codified: true});
    return s;
  }


  // @Get()
  // findAll() {
  //   return this.selectionneService.findAll();
  // }

  @Get('bydepartement/:departement')
  findByDepartement(@Param('departement') departement: string) {
    return this.selectionneService.findByDepartement(departement);
  }
  
  @Get('bysessionandformation/:session/:formation')
  findByTypeAndFormation(@Param('session') session: string, @Param('formation') formation: string,) {
    return this.selectionneService.findByTypeAndFormation(session, formation);
  }

  @Get('bysession/:session')
  findBySession(@Param('session') session: string) {
    return this.selectionneService.findBySession(session);
  }

  @Get('sociale/bysession/:session')
  findBySociale(@Param('session') session: string) {
    return this.selectionneService.findBySociale(session);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectionneService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSelectionneDto: UpdateSelectionneDto) {
  //   return this.selectionneService.update(id, updateSelectionneDto);
  // }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//    const s = await  this.selectionneService.remove(id);
//    if(s){
//      await this.inscriptionService.update(s.inscription._id,{is_codified: false});
//    }
//    else{
//     await this.inscriptionService.update(id,{is_codified: false});
//    }

//    return s;
//   }
}
