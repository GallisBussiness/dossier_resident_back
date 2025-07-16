import { IsDate, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export enum AllocationStatut {
    NEUF = 'NEUF',
    DETERIORE = 'DETERIORE',
}

export class CreateAllocationDto {

    @IsDate()
    date:Date;

    @IsMongoId()
    dossierId:string;

    @IsString()
    nom:string;

    @IsNumber()
    nombre:number;

    @IsString()
    @IsOptional()
    description?:string;


    @IsOptional()
    @IsEnum(AllocationStatut)
    etat:AllocationStatut;
}
