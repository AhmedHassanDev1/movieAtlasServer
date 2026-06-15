import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class VerificationEmailDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    code: string
}

export class ResendVerificationCodeDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string
}