import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsDate,
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
