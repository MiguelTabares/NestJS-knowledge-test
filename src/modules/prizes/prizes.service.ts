import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Prize } from '../../shared/entities/prize.entity';

@Injectable()
export class PrizesService {
  constructor(
    @InjectRepository(Prize)
    private readonly prizeRepository: Repository<Prize>,
  ) {}

  async getAllPrizes(): Promise<Prize[]> {
    return this.prizeRepository.find();
  }

  async getPrizeById(id: number): Promise<Prize> {
    const prize = await this.prizeRepository.findOne({ where: { id: id } });
    if (!prize) {
      throw new NotFoundException(`Prize with id ${id} not found`);
    }
    return prize;
  }

  async createPrize(prizeData: Partial<Prize>): Promise<Prize> {
    const prize = this.prizeRepository.create(prizeData);
    return this.prizeRepository.save(prize);
  }

  async updatePrize(id: number, prizeData: Partial<Prize>): Promise<Prize> {
    const prize = await this.prizeRepository.preload({
      id,
      ...prizeData,
    });
    if (!prize) {
      throw new NotFoundException(`Prize with id ${id} not found`);
    }
    return this.prizeRepository.save(prize);
  }

  async deletePrize(id: number): Promise<void> {
    const result = await this.prizeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Prize with id ${id} not found`);
    }
  }

  async getRandomPrize(): Promise<Prize> {
    const prizes = await this.prizeRepository.find({
      where: { stock: MoreThan(0) },
    });
    if (prizes.length === 0) {
      throw new Error('No prizes available');
    }
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    prize.stock -= 1;
    await this.prizeRepository.save(prize);
    return prize;
  }
}
