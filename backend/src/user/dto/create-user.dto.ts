import {IsString, IsEmail, IsDateString} from 'class-validator';

export class CreateUserDto {
    @IsString()
    userName!: string;
    
    @IsString()
    phone!: string;

    @IsString()
    firstname!: string;

    @IsString()
    lastName!: string;

    @IsEmail()
    email!: string;

    @IsString()
    password!: string;
}
