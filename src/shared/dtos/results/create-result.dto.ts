import {
  IsNumber,
  IsNotEmpty,
  IsPositive,
  Min,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateResultDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  position: number;

  @IsNumber()
  @IsNotEmpty()
  tournamentId: number;

  @IsNumber()
  @IsNotEmpty()
  playerId: number;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsDate()
  @IsOptional()
  deletedAt?: Date;
}
