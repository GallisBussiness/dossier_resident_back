import { Module } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { AllocationController } from './allocation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Allocation, AllocationSchema } from './entities/allocation.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Allocation.name,schema:AllocationSchema}],'resident')], 
  controllers: [AllocationController],
  providers: [AllocationService],
  exports:[AllocationService]
})
export class AllocationModule {}
