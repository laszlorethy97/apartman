import { IsDateString } from "class-validator";

export class GetReservationDto{
    @IsDateString()
    startDate!: Date;

    @IsDateString()
    endDate!: Date;
}