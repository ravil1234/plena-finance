import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 10)
  password: string;
}
