import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument,Schema as MongoSchema } from "mongoose";
import { Dossier } from "src/dossier/entities/dossier.entity";
import { Mois } from "../dto/create-payement.dto";

export type PayementDocument = HydratedDocument<Payement>;

@Schema({timestamps:true})
export class Payement {
    @Prop({type:MongoSchema.Types.ObjectId,ref:Dossier.name,required:true})
    dossierId:string;

    @Prop({type:Number,required:true})
    montant:number;

    @Prop({type:String,enum:Mois,required:true})
    mois:Mois;

    @Prop({type:String, unique:true,required:true})
    numero_facture:string;
}

export const PayementSchema = SchemaFactory.createForClass(Payement);

