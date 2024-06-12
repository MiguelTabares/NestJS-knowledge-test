import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AssignmentsController } from '../assignments/assignments.controller';
import { AssignmentsService } from '../assignments/assignments.service';
import { PrizesController } from './prizes.controller';
import { PrizesService } from './prizes.service';
import { Assignments } from '../../shared/entities/assignment.entity';
import { Player } from '../../shared/entities/player.entity';
import { Prize } from '../../shared/entities/prize.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignments, Player, Prize]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AssignmentsController, PrizesController],
  providers: [AssignmentsService, PrizesService],
})
export class AssignmentsModule {}
