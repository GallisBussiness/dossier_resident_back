import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type EquipementDocument = HydratedDocument<Equipement>;


@Schema({timestamps:true})
export class Equipement {
    @Prop({type:String,required:true})
    nom:string;

    @Prop({type:String})
    description:string;
}

export const EquipementSchema = SchemaFactory.createForClass(Equipement);

