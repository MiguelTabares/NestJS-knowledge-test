import { IsString, IsInt, Min } from 'class-validator';

export class CreatePrizeDto {
  @IsString()
  readonly name: string;

  @IsInt()
  @Min(1)
  readonly quantity: number;
}
