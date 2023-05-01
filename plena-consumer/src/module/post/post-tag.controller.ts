import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { PostTagRepository } from "./post-tag.repository";

@Controller()
export class PostTagController {
  constructor(private postRepository: PostTagRepository) {}
  @MessagePattern("POST_TAG")
  public async postTag(data: any) {
    return this.postRepository.updateTagCount(data.tag);
  }
}
