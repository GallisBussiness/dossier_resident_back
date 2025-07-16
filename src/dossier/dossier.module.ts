import { Module } from '@nestjs/common';
import { DossierService } from './dossier.service';
import { DossierController } from './dossier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dossier, DossierSchema } from './entities/dossier.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  controllers: [DossierController],
  providers: [DossierService],
  imports:[MongooseModule.forFeatureAsync([{name:Dossier.name,useFactory:()=> {
    const schema = DossierSchema;
    schema.plugin(require('mongoose-serial'),{field:"numero",prefix:"DOS-" + new Date().getFullYear().toString(), separator: "-", digits:6});
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}],'resident'),
  CaslModule,
],
  exports:[DossierService]
})
export class DossierModule {}
