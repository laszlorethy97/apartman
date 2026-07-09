import {IsString, IsNumber, IsDateString} from 'class-validator';

export class CreateCouponDto {
    @IsString()
    code!: string;

    @IsNumber()
    discount!: number;

    @IsDateString()
    expirationDate!: Date;
}
