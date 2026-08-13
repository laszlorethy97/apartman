import {IsDateString, IsNumber, IsString} from 'class-validator';

export class CreateReservationDto {
    @IsDateString()
    startDate!: Date;
    
    @IsDateString()
    endDate!: Date;

    @IsNumber()
    headCount!: number;

    @IsString()
    couponCode!: string;
}

