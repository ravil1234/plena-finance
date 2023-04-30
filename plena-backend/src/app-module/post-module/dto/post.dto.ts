import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
export class PostDto {
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 3000)
  description: string;

  @IsOptional()
  @IsString()
  tags: string;
}
