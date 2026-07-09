import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateInvoiceDto {
    @IsNumber()
    amount!: number;

    @IsDateString()
    issuDate!: Date;

    @IsDateString()
    paidAt!: Date;

    @IsString()
    stripeID!: string;
}
