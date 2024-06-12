import { IsInt, IsDate } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  playerId: number;

  @IsInt()
  prizeId: number;

  @IsDate()
  fecha: Date;
}
