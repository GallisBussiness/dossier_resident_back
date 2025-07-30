import { Injectable } from '@nestjs/common';
import { CreateChambreDto } from './dto/create-chambre.dto';
import { UpdateChambreDto } from './dto/update-chambre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chambre, ChambreDocument } from './entities/chambre.entity';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';

@Injectable()
export class ChambreService {
    @InjectModel(Chambre.name,"resident")
    private chambreModel: Model<ChambreDocument>;

  create(createChambreDto: CreateChambreDto) {
    try {
      const chambre = new this.chambreModel(createChambreDto);
      return chambre.save();
    } catch (error) {
      throw new HttpException('error creating chambre', 500);
    }
  }

  findAllByPavillon(id:string) {
    try {
      return this.chambreModel.find({pavillonId:id});
    } catch (error) {
      throw new HttpException('error getting chambres', 500);
    }
  }

  findAllByAnneeUniversitaire(anneeUniversitaireId:string) {
    try {
      return this.chambreModel.find({anneeUniversitaireId}).exec();
    } catch (error) {
      throw new HttpException('error getting chambres', 500);
    }
  }

  findOne(id: string) {
    try {
      return this.chambreModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('error getting chambre', 500);
    }
  }

  update(id:string, updateChambreDto: UpdateChambreDto) {
    try {
      return this.chambreModel.findByIdAndUpdate(id,updateChambreDto,{new:true}).exec();
    } catch (error) {
      throw new HttpException('error updating chambre', 500);
    }
  }

  remove(id: string) {
    try {
      return this.chambreModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new HttpException('error deleting chambre', 500);
    }
  }
}
