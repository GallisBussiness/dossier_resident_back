import { Injectable,HttpException } from '@nestjs/common';
import { CreateSelectionneDto, TYPECODIF } from './dto/create-selectionne.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Selectionne, SelectionneDocument } from './entities/selectionne.entity';
import { Model } from 'mongoose';

@Injectable()
export class SelectionneService {
  constructor(@InjectModel(Selectionne.name,'codif') private selectionneModel: Model<SelectionneDocument>) {}

  async create(createSelectionneDto: CreateSelectionneDto) {
    try {
      const selectionne = new this.selectionneModel(createSelectionneDto);
      return await selectionne.save();
    } catch (error) {
      throw new HttpException('error creating selectionne', 500);
    }
  }

  async findByTypeAndFormation(session: string, formation: string): Promise<Selection[]> {
    try {
      return await this.selectionneModel.find({session,formation,typeCodif:TYPECODIF.PEDAGOGIQUE})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async findBySociale(session: string): Promise<Selection[]> {
    try {
      return await this.selectionneModel.find({session,typeCodif: TYPECODIF.SOCIALE})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findBySession(session: string): Promise<Selection[]> {
    try {
      return await this.selectionneModel.find({session})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByDepartement(departement: string): Promise<Selection[]> {
    try {
      return await this.selectionneModel.find({'inscription.formation.departement': departement});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<Selection> {
    try {
      return await this.selectionneModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
 
