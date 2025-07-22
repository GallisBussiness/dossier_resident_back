import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEquipementDto {
    @IsString()
    @IsNotEmpty()
    nom:string;

    @IsString()
    @IsOptional()
    description:string;
}
