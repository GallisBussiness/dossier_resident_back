import { Injectable,HttpException } from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Campus, CampusDocument } from './entities/campus.entity';
import { Model } from 'mongoose';

@Injectable()
export class CampusService {
    @InjectModel(Campus.name,"resident")
    private campusModel: Model<CampusDocument>;

  create(createCampusDto: CreateCampusDto) {
    try {
      const campus = new this.campusModel(createCampusDto);
      return campus.save();
    } catch (error) {
      throw new HttpException('error creating campus', 500);
    }
  }

  findAll():Promise<CampusDocument[]> {
      try {
      return this.campusModel.find();
    } catch (error) {
      throw new HttpException('error getting campuses', 500);
    }
  }

  findWithPavillonsWithChambres():Promise<any[]> {
    try {
      return this.campusModel.aggregate([
        {
          $lookup:{
            from:'pavillons',
            localField:'_id',
            foreignField:'campusId',
            pipeline:[
              {
                $lookup:{
                  from:'chambres',
                  localField:'_id',
                  foreignField:'pavillonId',
                  as:'chambres'
                }
              }
            ],
            as:'pavillons'
          }
        }
      ]);
    } catch (error) {
      console.log(error.message);
      throw new HttpException('error getting campuses', 500);
    }
  }

  findOne(id: string) {
    try {
      return this.campusModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('error getting campus', 500);
    }
  }

  update(id: string, updateCampusDto: UpdateCampusDto) {
    try {
      return this.campusModel.findByIdAndUpdate(id,updateCampusDto,{new:true}).exec();
    } catch (error) {
      throw new HttpException('error updating campus', 500);
    }
  }

  remove(id: string) {
    try {
      return this.campusModel.findByIdAndDelete(id).exec();
    } catch (error) { 
      throw new HttpException('error deleting campus', 500);
    }
  }
}
