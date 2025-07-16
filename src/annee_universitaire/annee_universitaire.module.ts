import { Module } from '@nestjs/common';
import { AnneeUniversitaireService } from './annee_universitaire.service';
import { AnneeUniversitaireController } from './annee_universitaire.controller';
import { CaslModule } from 'src/casl/casl.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AnneeUniversitaire, AnneeUniversitaireSchema } from './entities/annee_universitaire.entity';

@Module({
  controllers: [AnneeUniversitaireController],
  providers: [AnneeUniversitaireService],
  imports: [CaslModule,MongooseModule.forFeature([{name: AnneeUniversitaire.name, schema: AnneeUniversitaireSchema}],"resident"),],
  exports: [AnneeUniversitaireService]
})
export class AnneeUniversitaireModule {}
