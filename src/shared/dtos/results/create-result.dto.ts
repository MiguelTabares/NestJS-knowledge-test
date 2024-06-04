import {
  IsNumber,
  IsNotEmpty,
  IsPositive,
  Min,
  IsDateString,
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
  @IsPositive()
  tournamentId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  winnerId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  loserId: number;

  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @IsDateString()
  @IsOptional()
  updatedAt?: Date;

  @IsDateString()
  @IsOptional()
  deletedAt?: Date;
}
