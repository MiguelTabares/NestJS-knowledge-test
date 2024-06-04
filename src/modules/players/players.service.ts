import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreatePlayerDto, UpdatePlayerDto } from '../../shared/dtos/index-dtos';
import { Player } from '../../shared/entities/index-entities';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = this.playersRepository.create(createPlayerDto);
    return await this.playersRepository.save(player);
  }

  async findAll(): Promise<Player[]> {
    return await this.playersRepository.find({ relations: ['tournaments'] });
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.playersRepository.findOne({
      where: { id },
      relations: ['tournaments'],
    });
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.playersRepository.preload({
      id,
      ...updatePlayerDto,
    });
    if (!player) {
      throw new NotFoundException(`Player's id: ${id} is not found`);
    }
    return await this.playersRepository.save(player);
  }

  async remove(id: number): Promise<void> {
    const player = await this.playersRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException(`Player's id: ${id} is not found`);
    }
    await this.playersRepository.softDelete(id);
  }

  async search(
    term: string,
    page: number,
    limit: number,
    sortField: string,
    sortOrder: 'asc' | 'desc',
  ) {
    try {
      const [result, total] = await this.playersRepository.findAndCount({
        where: [{ name: ILike(`%${term}%`) }, { lastname: ILike(`%${term}%`) }],
        order: { [sortField]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        data: result,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error('Error searching author information');
    }
  }
}
