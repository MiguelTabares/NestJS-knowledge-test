import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../shared/entities/player.entity';
import { Prize } from 'src/shared/entities/prize.entity';
import { Assignments } from 'src/shared/entities/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Prize, Assignments])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
