import { HttpException, Injectable } from '@nestjs/common';
import { CreateAnneeUniversitaireDto } from './dto/create-annee_universitaire.dto';
import { UpdateAnneeUniversitaireDto } from './dto/update-annee_universitaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnneeUniversitaire, AnneeUniversitaireDocument } from './entities/annee_universitaire.entity';

@Injectable()
export class AnneeUniversitaireService {
  constructor(@InjectModel(AnneeUniversitaire.name,'resident') private anneeUniversitaireModel: Model<AnneeUniversitaireDocument>) {}

  async create(createAnneeUniversitaireDto: CreateAnneeUniversitaireDto) {
    try {
      const anneeUniversitaire = new this.anneeUniversitaireModel(createAnneeUniversitaireDto);
      return await anneeUniversitaire.save();
    } catch (error) {
      throw new HttpException('error creating annee universitaire', 500);
    }
  }

  async findAll() {
    try {
      return await this.anneeUniversitaireModel.find();
    } catch (error) {
      throw new HttpException('error getting annee universitaire', 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.anneeUniversitaireModel.findById(id);
    } catch (error) {
      throw new HttpException('error getting annee universitaire', 500);
    }
  }

  async findOneActive() {
    try {
      return await this.anneeUniversitaireModel.findOne({isActif:true});
    } catch (error) {
      console.log(error);
      throw new HttpException('error getting annee universitaire', 500);
    }
  }

  async update(id: string, updateAnneeUniversitaireDto: UpdateAnneeUniversitaireDto) {
    try {
      return await this.anneeUniversitaireModel.findByIdAndUpdate(id, updateAnneeUniversitaireDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {
    try {
      return await this.anneeUniversitaireModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('error deleting annee universitaire', 500);
    }
  }
}
