import { PartialType } from '@nestjs/mapped-types';
import { CreateCodificationDto } from './create-codification.dto';

export class UpdateCodificationDto extends PartialType(CreateCodificationDto) {}
