import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { PostService } from "./post-tag.repository";

@Controller()
export class PostTagController {
  constructor(private postService: PostService) {}
  @MessagePattern("POST")
  async postTag() {}
}
