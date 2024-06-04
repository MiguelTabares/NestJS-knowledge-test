import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { CreateResultDto, UpdateResultDto } from '../../shared/dtos/index-dtos';
import { Result } from '../../shared/entities/index-entities';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async createResult(createResultDto: CreateResultDto): Promise<Result> {
    const result = this.resultRepository.create(createResultDto);
    return await this.resultRepository.save(result);
  }

  async getResultsByTournament(
    tournamentId: string,
    page: number,
    limit: number,
    minScore: number,
  ): Promise<[Result[], number]> {
    const numericTournamentId = parseInt(tournamentId, 10);
    const [result, total] = await this.resultRepository.findAndCount({
      where: {
        tournament: { id: numericTournamentId },
        score: MoreThanOrEqual(minScore),
      },
      order: { score: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['player', 'tournament'],
    });
    return [result, total];
  }

  async getResultsByPlayerWithFilter(
    playerId: string,
    startDate: Date,
    page: number,
    limit: number,
  ): Promise<[Result[], number]> {
    const numericPlayerId = parseInt(playerId, 10);
    const [result, total] = await this.resultRepository.findAndCount({
      where: {
        playerId: numericPlayerId,
        createdAt: MoreThanOrEqual(startDate),
      },
      order: { score: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['player', 'tournament'],
    });
    return [result, total];
  }

  async findOne(id: number): Promise<Result> {
    return this.resultRepository.findOne({
      where: { id },
      relations: ['player', 'tournament'],
    });
  }

  async update(id: number, updateResultDto: UpdateResultDto): Promise<Result> {
    const result = await this.resultRepository.preload({
      id,
      ...updateResultDto,
    });
    if (!result) {
      throw new Error('Result not found');
    }
    return this.resultRepository.save(result);
  }

  async remove(id: number): Promise<void> {
    await this.resultRepository.softDelete(id);
  }
}
