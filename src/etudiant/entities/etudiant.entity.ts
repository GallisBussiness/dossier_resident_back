import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type EtudiantDocument = Etudiant & Document;

export class Etudiant {
    _id: string;

    prenom: string;
  
    nom: string;
  
    email: string;
  
    tel: string;
  
    dateDeNaissance: string;
    
    lieuDeNaissance: string;

    nationalite: string;
  
    avatar: string;
  
    @Prop({type:String,unique:true})
    ncs: string;
}


export const EtudiantSchema = SchemaFactory.createForClass(Etudiant);