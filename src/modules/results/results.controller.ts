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
import { CreateResultDto, UpdateResultDto } from '../../shared/dtos/index-dtos';
import { Result } from 'src/shared/entities/result.entity';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  createResult(
    @Body('playerId') playerId: number,
    @Body('tournamentId') tournamentId: number,
    @Body() createResultDto: CreateResultDto,
  ) {
    return this.resultsService.createResult(
      playerId,
      tournamentId,
      createResultDto,
    );
  }

  @Get()
  getResultsByPlayer(
    @Query('playerId') playerId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortField') sortField: 'score',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<[Result[], number]>{
    return this.resultsService.getResultsByPlayer(
      playerId,
      page,
      limit,
      sortField,
      sortOrder,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultsService.remove(+id);
  }
}
