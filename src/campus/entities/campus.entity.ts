import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CampusDocument = HydratedDocument<Campus>;

@Schema({timestamps:true})
export class Campus {
    @Prop({type:String,required:true})
    nom:string;

    @Prop({type:String})
    adresse:string;

    @Prop({type:String})
    latitude:string;    

    @Prop({type:String})
    longitude:string;
}

export const CampusSchema = SchemaFactory.createForClass(Campus);

