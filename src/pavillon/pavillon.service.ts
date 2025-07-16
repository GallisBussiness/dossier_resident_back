import { HttpException, Injectable } from '@nestjs/common';
import { CreatePavillonDto } from './dto/create-pavillon.dto';
import { UpdatePavillonDto } from './dto/update-pavillon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pavillon, PavillonDocument } from './entities/pavillon.entity';
import { Model } from 'mongoose';

@Injectable()
export class PavillonService {
    @InjectModel(Pavillon.name,"resident")
    private pavillonModel: Model<PavillonDocument>;

  create(createPavillonDto: CreatePavillonDto) {
    try {
      const pavillon = new this.pavillonModel(createPavillonDto);
      return pavillon.save();
    } catch (error) {
      throw new HttpException('error creating pavillon', 500);
    }
  }

  findAll() {
    try {
      return this.pavillonModel.find().exec();
    } catch (error) {
      throw new HttpException('error getting pavillons', 500);
    }
  }

  findAllByCampus(id:string) {
    try {
      return this.pavillonModel.find({campusId:id});
    } catch (error) {
      throw new HttpException('error getting pavillons', 500);
    }
  }

  findOne(id: string) {
    try {
      return this.pavillonModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('error getting pavillon', 500);
    }
  }

  update(id:string, updatePavillonDto: UpdatePavillonDto) {
    try {
      return this.pavillonModel.findByIdAndUpdate(id,updatePavillonDto,{new:true}).exec();
    } catch (error) {
      throw new HttpException('error updating pavillon', 500);
    }
  }

  remove(id: string) {
    try {
      return this.pavillonModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new HttpException('error deleting pavillon', 500);
    }
  }
}
