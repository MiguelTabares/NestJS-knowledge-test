import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { Prize } from '../../shared/entities/prize.entity';

@Controller('prizes')
export class PrizesController {
  constructor(private readonly prizesService: PrizesService) {}

  @Get()
  async getAllPrizes(): Promise<Prize[]> {
    try {
      const prizes = await this.prizesService.getAllPrizes();
      return prizes;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async getPrizeById(@Param('id') id: number): Promise<Prize> {
    try {
      const prize = await this.prizesService.getPrizeById(id);
      return prize;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async createPrize(@Body() prizeData: Partial<Prize>): Promise<Prize> {
    try {
      const newPrize = await this.prizesService.createPrize(prizeData);
      return newPrize;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async updatePrize(
    @Param('id') id: number,
    @Body() prizeData: Partial<Prize>,
  ): Promise<Prize> {
    try {
      const updatedPrize = await this.prizesService.updatePrize(id, prizeData);
      return updatedPrize;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async deletePrize(@Param('id') id: number): Promise<void> {
    try {
      await this.prizesService.deletePrize(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('random')
  async getRandomPrize(): Promise<Prize> {
    try {
      const prize = await this.prizesService.getRandomPrize();
      return prize;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
