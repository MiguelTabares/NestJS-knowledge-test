import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { PrizesService } from '../prizes/prizes.service';
import { Assignments } from '../../shared/entities/assignment.entity';
import { Player } from '../../shared/entities/player.entity';
import { Prize } from '../../shared/entities/prize.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignments, Player, Prize]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService, PrizesService],
})
export class AssignmentsModule {}
