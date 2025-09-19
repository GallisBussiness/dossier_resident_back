import { SchemaFactory } from "@nestjs/mongoose";
import { Formation } from "src/formation/entities/formation.entity";

export class Departement {
    _id: string;

    nom: string;

    ufr: string;
    
   formations: Formation[]
}

export const DepartementSchema = SchemaFactory.createForClass(Departement);
