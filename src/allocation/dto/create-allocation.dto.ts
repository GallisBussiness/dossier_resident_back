import {IsMongoId, IsNumber, IsOptional, IsString, IsDateString } from "class-validator";

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
    @IsString()
    constatation:string;
}
