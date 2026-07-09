import {IsString, IsDateString} from 'class-validator';

export class CreateReservationDto {
    @IsDateString()
    startDate!: Date;
    
    @IsDateString()
    endDate!: Date;

    @IsString()
    status!: string;

    @IsString()
    isSeason!: boolean;
}

