import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto, UpdatePlayerDto } from '../../shared/dtos/index-dtos';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  async findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }

  @Get('search')
  search(
    @Query('term') term: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortField') sortField: 'id',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.playersService.search(term, page, limit, sortField, sortOrder);
  }
}
