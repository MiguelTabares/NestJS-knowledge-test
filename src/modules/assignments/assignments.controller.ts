import { CreateAssignmentDto } from './../../shared/dtos/assignments/create-assignment.dto';
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  async createAssignment(@Body() createAssignmentsDto: CreateAssignmentDto) {
    try {
      const assignment = await this.assignmentsService.assignRandomPrize(
        createAssignmentsDto.playerId,
      );
      return {
        status: 'success',
        data: assignment,
      };
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
