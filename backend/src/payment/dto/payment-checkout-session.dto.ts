import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsInt()
  @Min(1)
  headCount!: number;

  @IsString()
  couponCode!: string; 
}