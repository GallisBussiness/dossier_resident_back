import { HttpException, Injectable } from '@nestjs/common';
import { CreateAnneeUniversitaireDto } from './dto/create-annee_universitaire.dto';
import { UpdateAnneeUniversitaireDto } from './dto/update-annee_universitaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnneeUniversitaire, AnneeUniversitaireDocument } from './entities/annee_universitaire.entity';
import { CampusService } from '../campus/campus.service';
import { PavillonService } from '../pavillon/pavillon.service';
import { ChambreService } from '../chambre/chambre.service';
import { DossierService } from '../dossier/dossier.service';

@Injectable()
export class AnneeUniversitaireService {
  constructor(
    @InjectModel(AnneeUniversitaire.name, 'resident') private anneeUniversitaireModel: Model<AnneeUniversitaireDocument>,
    private readonly campusService: CampusService,
    private readonly pavillonService: PavillonService,
    private readonly chambreService: ChambreService,
    private readonly dossierService: DossierService,
  ) {}

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

  async import(importDto: {anneeFrom:string,anneeTo:string}) {
    try {
     const campusesTo = await this.campusService.findAll(importDto.anneeTo);
     if(campusesTo.length == 0){
      const campusesFrom = await this.campusService.findAll(importDto.anneeFrom);
      for(const campus of campusesFrom){
        const {_id,...rest} = campus.toObject();
       const campusCreated = await this.campusService.create({
          ...rest,
          anneeUniversitaireId:importDto.anneeTo
        });
        const pavillonsTo = await this.pavillonService.findAllByAnneeUniversitaire(importDto.anneeTo);
     if(pavillonsTo.length == 0){
      const pavillonsFrom = await this.pavillonService.findAllByAnneeUniversitaire(importDto.anneeFrom);
      for(const pavillon of pavillonsFrom){
        const {_id,...rest} = pavillon.toObject();
        const pavillonCreated = await this.pavillonService.create({
          ...rest,
          campusId: campusCreated._id.toString(),
          anneeUniversitaireId:importDto.anneeTo
        });
        const chambresTo = await this.chambreService.findAllByAnneeUniversitaire(importDto.anneeTo);
        if(chambresTo.length == 0){
         const chambresFrom = await this.chambreService.findAllByAnneeUniversitaire(importDto.anneeFrom);
         for(const chambre of chambresFrom){
           const {_id,...rest} = chambre.toObject();
           await this.chambreService.create({
             ...rest,
             anneeUniversitaireId:importDto.anneeTo,
             pavillonId: pavillonCreated._id.toString()
           });
         }
        }
      }
     }
      }
     }
    } catch (error) {
      throw new HttpException('error importing annee universitaire', 500);
    }
  }

  async getStatistiques(anneeId: string) {
   try {
    const dossiers = await this.dossierService.findAllByAnneeUniversitaire(anneeId);
    const campus = await this.campusService.findWithPavillonsWithChambres(anneeId);
    const chambre_par_campus = campus.filter((campus:any)=>campus.anneeUniversitaireId.toString() == anneeId).map((campus:any) => {
      return {
        campus: campus.nom,
        chambres: campus.pavillons.reduce((acc:any, pavillon:any) => {
          return acc + pavillon.chambres.filter((chambre:any)=>chambre.anneeUniversitaireId.toString() == anneeId).length;
        }, 0),
      };
    });
    const chambre_par_pavillon = campus.filter((campus:any)=>campus.anneeUniversitaireId.toString() == anneeId).map((campus:any) => {
      return {
        campus: campus.nom,
        pavillons: campus.pavillons.reduce((acc:any, pavillon:any) => {
          return [...acc,{pavillon:pavillon.nom,chambres:pavillon.chambres.filter((chambre:any)=>chambre.anneeUniversitaireId.toString() == anneeId).length}];
        }, []),
      };
    });

    const total_places_par_pavillon = campus.filter((campus:any)=>campus.anneeUniversitaireId.toString() == anneeId).map((campus:any) => {
      return {
        campus: campus.nom,
        pavillons: campus.pavillons.reduce((acc:any, pavillon:any) => {
         return [...acc,{pavillon:pavillon.nom,places:pavillon.chambres.reduce((accc:any, chambre:any) => {
           return accc += chambre.places;
         }, 0),
         places_occupees:pavillon.chambres.reduce((accu:any, chambre:any) => {
          return accu += dossiers.filter((dossier:any)=>{
            return dossier.chambreId._id.toString() == chambre._id.toString();
          }).length;
         }, 0),
        }]; 
       },[]),
      };
    }); 
    
    return {
      dossiers,
      campus,
      chambre_par_campus,
      chambre_par_pavillon,
      total_places_par_pavillon,
    };
   } catch (error) {
    throw new HttpException('error getting statistiques', 500);
   }
  }
  
}
