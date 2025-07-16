import { IsMongoId, IsOptional, IsString } from "class-validator";

export class CreatePavillonDto {
    @IsString()
    nom:string;

   @IsMongoId()
   campusId:string;

   @IsOptional()
   @IsString()
   description?:string;
}
