import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  team: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @IsDateString()
  @IsOptional()
  updatedAt?: Date;

  @IsDateString()
  @IsOptional()
  deletedAt?: Date;

  @IsDateString()
  @IsOptional()
  claimedAt?: Date;
}
