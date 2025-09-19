import { SchemaFactory } from "@nestjs/mongoose";
import { Document} from "mongoose";

export type InscriptionDocument = Inscription & Document;

export class Inscription {
    _id: string;
    etudiant: {_id:string,genre:string};
    session:string;
    formation: {_id: string,departement: string};
    active:boolean;
}


export const InscriptionSchema = SchemaFactory.createForClass(Inscription);