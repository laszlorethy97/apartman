import {IsDateString, IsNumber} from 'class-validator';

export class CreateReservationDto {
    @IsDateString()
    startDate!: Date;
    
    @IsDateString()
    endDate!: Date;

    @IsNumber()
    headCount!: Number;
}

