import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignments } from '../../shared/entities/assignment.entity';
import { Player } from '../../shared/entities/player.entity';
import { PrizesService } from '../prizes/prizes.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AssignmentsService {
  private readonly logger = new Logger(AssignmentsService.name);

  constructor(
    @InjectRepository(Assignments)
    private readonly assignmentsRepository: Repository<Assignments>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly prizesService: PrizesService
  ) {}

  async assignRandomPrize(playerId: number): Promise<Assignments> {
    const player = await this.playerRepository.findOne({where: {id: playerId}});
    if (!player) {
      throw new Error('Player not found');
    }

    const randomPrize = await this.prizesService.getRandomPrize();
    
    const assignment = new Assignments();
    assignment.player = player;
    assignment.prize = randomPrize;
    assignment.fecha = new Date();

    return this.assignmentsRepository.save(assignment);
  }

  // Línea comentada: Probar que funciona al ejecutar cada 30 segundos.
  // @Cron('30 * * * * *', {
  @Cron('59 23 * * *', {
    timeZone: 'America/Bogota',
  })

  async assignPrizesAutomatically() {
    console.log("Hola");
    
    this.logger.debug('Assigning prizes automatically at 11:59pm Colombia time');

    const players = await this.playerRepository.find({ where: { claimedAt: null } });

    for (const player of players) {
      const assignment = await this.assignRandomPrize(player.id);
      this.logger.debug(`Assigned prize ${assignment.prize.id} to player ${player.id}`);
    }
  }
}
