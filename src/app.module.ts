import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './modules/players/players.module';
import { ResultsModule } from './modules/results/results.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import dbConfig from './db-config/dbConfig';
import { AssignmentsModule } from './modules/assignments/assignments.module';
import { PrizesModule } from './modules/prizes/prizes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbConfig().database.host,
      port: dbConfig().database.port,
      username: dbConfig().database.username,
      password: dbConfig().database.password,
      database: dbConfig().database.db,
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        ssl: true,
      },
    }),
    PlayersModule,
    ResultsModule,
    TournamentsModule,
    PrizesModule,
    AssignmentsModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
