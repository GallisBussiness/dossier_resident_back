import { Injectable } from '@nestjs/common';
import { CreateDossierDto } from './dto/create-dossier.dto';
import { UpdateDossierDto } from './dto/update-dossier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dossier, DossierDocument } from './entities/dossier.entity';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { EtudiantService } from 'src/etudiant/etudiant.service';

@Injectable()
export class DossierService {
 constructor(@InjectModel(Dossier.name,"resident") private dossierModel: Model<DossierDocument>,
 private readonly etudiantService: EtudiantService){}

  create(createDossierDto: CreateDossierDto):Promise<DossierDocument> {
    try {
      const dossier = new this.dossierModel(createDossierDto);
      return dossier.save();
    } catch (error) {
      throw new HttpException('error creating dossier', 500);
    }
  }

  findAllByEtudiant(id:string):Promise<DossierDocument[]> {
    try {
      return this.dossierModel.find({etudiantId:id}).exec();
    } catch (error) {
      throw new HttpException('error getting dossier', 500);
    }
  }

  findAllByChambre(id:string):Promise<DossierDocument[]> {
    try {
      return this.dossierModel.find({chambreId:id}).exec();
    } catch (error) {
      throw new HttpException('error getting dossier', 500);
    }
  }

  async findAllByAnneeUniversitaire(id:string):Promise<any[]> {
    try {
      const dossiers = await this.dossierModel.find({anneeUniversitaireId:id}).exec();
      const etudiantsIds = dossiers.map((dossier:DossierDocument)=>{
        return dossier.etudiantId;
      });
      const etudiants = await this.etudiantService.findAllByIds(etudiantsIds) ;
      const result = [];
      const r = dossiers;
      r.forEach((d:any)=>{
        result.push({
          ...d._doc,
          etudiant: etudiants.find((etudiant:any)=>{
            return etudiant._doc.ncs === d._doc.etudiantId
          })
        })
      })
      return result;
    } catch (error) {
      throw new HttpException('error getting dossier', 500);
    }
  }

  findAll():Promise<DossierDocument[]> {
    try {
      return this.dossierModel.find().exec();
    } catch (error) {
      throw new HttpException('error getting dossier', 500);
    }
  }

  findOne(id: string):Promise<DossierDocument> {
    try {
      return this.dossierModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('error getting dossier', 500);
    }
  }

  update(id: string, updateDossierDto: UpdateDossierDto):Promise<DossierDocument> {
    try {
      return this.dossierModel.findByIdAndUpdate(id,updateDossierDto).exec();
    } catch (error) {
      throw new HttpException('error updating dossier', 500);
    }
  }

  remove(id: string):Promise<DossierDocument> {
    try {
      return this.dossierModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new HttpException('error deleting dossier', 500);
    }
  }
}
