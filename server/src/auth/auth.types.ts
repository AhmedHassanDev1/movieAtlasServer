

export type SignUpData = {
  user_name: string;
  email: string;
  password: string;
}

export type VerificationEmailType = {
  email: string;
  code: string
}

export type logInType = {
  email: string;
  password: string;
}

export type TokenPayloadType ={
   id:string 
   email:string 
   user_name:string
}