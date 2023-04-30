import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { PostService } from "./consumer.repository";

@Controller()
export class CommentController {
  constructor(private postService: PostService) {}
  @MessagePattern()
  async b() {}
}
