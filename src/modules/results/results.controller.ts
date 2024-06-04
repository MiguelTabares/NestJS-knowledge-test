import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from '../../shared/dtos/index-dtos';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post('createResult')
  async createResult(@Body() createResultDto: CreateResultDto) {
    try {
      const result = await this.resultsService.createResult(createResultDto);
      return { message: 'Resultado creado exitosamente', result };
    } catch (error) {
      return { error: 'Error al crear el resultado' };
    }
  }

  @Get('tournament/:tournamentId')
  async getResultsByTournament(
    @Param('tournamentId') tournamentId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('minScore') minScore: number,
  ) {
    const [results, total] = await this.resultsService.getResultsByTournament(
      tournamentId,
      page,
      limit,
      minScore,
    );
    return { results, total };
  }

  @Get('player/:playerId')
  async getResultsByPlayerWithFilter(
    @Param('playerId') playerId: string,
    @Query('startDate') startDate: Date,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const [results, total] =
      await this.resultsService.getResultsByPlayerWithFilter(
        playerId,
        startDate,
        page,
        limit,
      );
    return { results, total };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.resultsService.remove(+id);
  }
}
