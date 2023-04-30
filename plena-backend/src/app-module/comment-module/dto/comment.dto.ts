import { IsNotEmpty, IsString, Length } from "class-validator";
export class CommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 200)
  text: string;

  @IsNotEmpty()
  @IsString()
  postId: string;
}
