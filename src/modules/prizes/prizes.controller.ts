import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { Prize } from '../../shared/entities/prize.entity';

@Controller('prizes')
export class PrizesController {
  constructor(private readonly prizesService: PrizesService) {}

  @Get('random')
  async getRandomPrize(): Promise<Prize> {
    try {
      const prize = await this.prizesService.getRandomPrize();
      return prize;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
