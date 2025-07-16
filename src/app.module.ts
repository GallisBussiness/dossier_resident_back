import { RequestMethod, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DossierModule } from './dossier/dossier.module';
import { CodificationModule } from './codification/codification.module';
import { PayementModule } from './payement/payement.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { InscriptionModule } from './inscription/inscription.module';
import { AnneeUniversitaireModule } from './annee_universitaire/annee_universitaire.module';
import { CampusModule } from './campus/campus.module';
import { PavillonModule } from './pavillon/pavillon.module';
import { ChambreModule } from './chambre/chambre.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URL_ETUDIANT'),
        autoCreate: true,
      }),
      connectionName: 'etudiant',
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URL_RESIDENT'),
        autoCreate: true,
      }),
      connectionName: 'resident',
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    EtudiantModule,
    InscriptionModule,
    DossierModule,
    CodificationModule,
    PayementModule,
    AnneeUniversitaireModule,
    CampusModule,
    PavillonModule,
    ChambreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'user/login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
