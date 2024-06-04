import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from '../../shared/entities/index-entities';
import {
  CreateTournamentDto,
  UpdateTournamentDto,
} from 'src/shared/dtos/index-dtos';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const tournament = this.tournamentRepository.create(createTournamentDto);
    return await this.tournamentRepository.save(tournament);
  }

  async findAll(): Promise<Tournament[]> {
    return await this.tournamentRepository.find({ relations: ['players'] });
  }

  async findOne(id: number): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id },
      relations: ['players'],
    });
    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }
    return tournament;
  }

  async update(
    id: number,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<Tournament> {
    const tournament = await this.tournamentRepository.preload({
      id,
      ...updateTournamentDto,
    });
    if (!tournament) {
      throw new NotFoundException(`Tournament's id: ${id} is not found`);
    }
    return await this.tournamentRepository.save(tournament);
  }

  async remove(id: number): Promise<void> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id },
    });
    if (!tournament) {
      throw new NotFoundException(`Tournament's id: ${id} is not found`);
    }
    await this.tournamentRepository.softDelete(id);
  }
}

//