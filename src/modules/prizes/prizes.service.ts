import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Prize } from '../../shared/entities/prize.entity';

@Injectable()
export class PrizesService {
  constructor(
    @InjectRepository(Prize)
    private readonly prizeRepository: Repository<Prize>
  ) {}

  async getRandomPrize(): Promise<Prize> {
    const prizes = await this.prizeRepository.find({ where: { stock: MoreThan(0) } });
    if (prizes.length === 0) {
      throw new Error('No prizes available');
    }
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    prize.stock -= 1;
    await this.prizeRepository.save(prize);
    return prize;
  }
}
