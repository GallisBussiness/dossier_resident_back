import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument,Schema as MongoSchema} from "mongoose";
import { Campus } from "src/campus/entities/campus.entity";
import { AnneeUniversitaire } from "src/annee_universitaire/entities/annee_universitaire.entity";

export type PavillonDocument = HydratedDocument<Pavillon>;

@Schema({timestamps:true})
export class Pavillon {
    @Prop({type:String,required:true})
    nom:string;

    @Prop({type:MongoSchema.Types.ObjectId,ref:Campus.name,required:true,autopopulate:true})
    campusId:string;

    @Prop({type:String})
    description?:string;    

    @Prop({type:MongoSchema.Types.ObjectId,ref:AnneeUniversitaire.name,required:true})
    anneeUniversitaireId:string;
}


export const PavillonSchema = SchemaFactory.createForClass(Pavillon);
