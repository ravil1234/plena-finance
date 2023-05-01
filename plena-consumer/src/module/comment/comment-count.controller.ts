import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CommentCountRepository } from "./comment-count.repository";

@Controller()
export class CommentCountController {
  constructor(private commentCountRepository: CommentCountRepository) {}
  @MessagePattern("SAVE_COMMENT")
  public async saveComment(data: any) {
    return this.commentCountRepository.updateCommentCount(data.postId, 1);
  }
  @MessagePattern("DELETE_COMMENT")
  public async deleteComment(data: any) {
    return this.commentCountRepository.updateCommentCount(data.postId, -1);
  }
}
