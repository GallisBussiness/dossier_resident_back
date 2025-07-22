import { Module } from '@nestjs/common';
import { AnneeUniversitaireService } from './annee_universitaire.service';
import { AnneeUniversitaireController } from './annee_universitaire.controller';
import { CaslModule } from 'src/casl/casl.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AnneeUniversitaire, AnneeUniversitaireSchema } from './entities/annee_universitaire.entity';
import { CampusModule } from 'src/campus/campus.module';
import { PavillonModule } from 'src/pavillon/pavillon.module';
import { ChambreModule } from 'src/chambre/chambre.module';
import { DossierModule } from 'src/dossier/dossier.module';
import { EtudiantModule } from 'src/etudiant/etudiant.module';
@Module({
  controllers: [AnneeUniversitaireController],
  providers: [AnneeUniversitaireService],
  imports: [CaslModule,MongooseModule.forFeature([{name: AnneeUniversitaire.name, schema: AnneeUniversitaireSchema}],"resident"),
  CampusModule,
  PavillonModule,
  ChambreModule,
  DossierModule,
  EtudiantModule,
],
  exports: [AnneeUniversitaireService]
})
export class AnneeUniversitaireModule {}
