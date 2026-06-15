import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator"

export class SignUpDTO{

    @IsString()
    @IsNotEmpty({message:"Username is required."})
    user_name:string

    @IsEmail()
    @IsNotEmpty({message:"Email is required."})
    email:string 
    
    @IsString()
    @IsNotEmpty({message:"Password is required."})
    @MinLength(8,{message:"Password must be at least 8 characters long."})
    password:string

}

export class SignInDTO{

    @IsEmail()
    @IsNotEmpty({message:"Email is required."})
    email:string    

    @IsString()
    @IsNotEmpty({message:"Password is required."})
    password:string
}


