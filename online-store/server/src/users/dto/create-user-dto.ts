import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @MinLength(11)
    phone: number;
}