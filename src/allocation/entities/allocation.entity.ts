import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { AllocationStatut } from "../dto/create-allocation.dto";
import { Dossier } from "src/dossier/entities/dossier.entity";
import { HydratedDocument,Schema as MongoSchema } from "mongoose";
import { Equipement } from "src/equipement/entities/equipement.entity";

export type AllocationDocument = HydratedDocument<Allocation>;

@Schema({timestamps:true})
export class Allocation {
    @Prop({type:Date,required:true})
    date:Date;

    @Prop({type:MongoSchema.Types.ObjectId,ref:Dossier.name,required:true})
    dossierId:string;

    @Prop({type:MongoSchema.Types.ObjectId,ref:Equipement.name,required:true})
    equipementId:string;

    @Prop({type:Number,required:true})
    nombre:number;

    @Prop({type:String})
    description:string;

    @Prop({type:String,enum:AllocationStatut,default:AllocationStatut.NEUF})
    etat:AllocationStatut;
}

export const AllocationSchema = SchemaFactory.createForClass(Allocation);
