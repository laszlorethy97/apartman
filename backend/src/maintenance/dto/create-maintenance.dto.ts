import { IsDateString } from "class-validator";

export class CreateMaintenanceDto {
    @IsDateString()
    startDate!: Date;

    @IsDateString()
    endDate!: Date;
}
