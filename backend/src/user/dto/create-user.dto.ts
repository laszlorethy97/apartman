import {IsString, IsEmail, IsPhoneNumber} from 'class-validator';

export class CreateUserDto {
    @IsString()
    userName!: string;
    
    @IsString()
    @IsPhoneNumber()
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
