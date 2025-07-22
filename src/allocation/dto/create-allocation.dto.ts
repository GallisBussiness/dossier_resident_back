import {IsEnum, IsMongoId, IsNumber, IsOptional, IsString, IsDateString } from "class-validator";

export enum AllocationStatut {
    NEUF = 'NEUF',
    DETERIORE = 'DETERIORE',
}

export class CreateAllocationDto {

    @IsDateString()
    date:string;

    @IsMongoId()
    dossierId:string;

    @IsMongoId()
    equipementId:string;

    @IsNumber()
    nombre:number;

    @IsString()
    @IsOptional()
    description?:string;


    @IsOptional()
    @IsEnum(AllocationStatut)
    etat:AllocationStatut;
}
