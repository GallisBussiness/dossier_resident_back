import { Injectable } from '@nestjs/common';
import { CreateCodificationDto } from './dto/create-codification.dto';
import { UpdateCodificationDto } from './dto/update-codification.dto';

@Injectable()
export class CodificationService {
  create(createCodificationDto: CreateCodificationDto) {
    return 'This action adds a new codification';
  }

  findAll() {
    return `This action returns all codification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} codification`;
  }

  update(id: number, updateCodificationDto: UpdateCodificationDto) {
    return `This action updates a #${id} codification`;
  }

  remove(id: number) {
    return `This action removes a #${id} codification`;
  }
}
