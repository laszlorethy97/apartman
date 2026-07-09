import { IsString, IsNumber } from 'class-validator';

export class CreateApartmanDto {
    @IsString()
    name!: string;

    @IsNumber()
    price!: number;

    @IsString()
    address!: string;
    
    @IsNumber()
    capacity!: number;
}
