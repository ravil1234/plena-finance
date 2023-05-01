import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CommentCountEntity } from "./comment-count.entity";
import { CommentCountInterface } from "./comment-count.interface";

@Injectable()
export class CommentCountRepository {
  constructor(
    @InjectModel("CommentCount")
    private commentCountModel: Model<CommentCountInterface>
  ) {}
  public async saveNewPostComment(
    body: Partial<CommentCountEntity>
  ): Promise<any> {
    const commentInterface = new this.commentCountModel(body);
    return commentInterface.save();
  }
  public async updateCommentCount(
    postId: string,
    counter: number
  ): Promise<any> {
    try {
      const data = await this.commentCountModel.updateOne(
        { postTag: postId },
        { $inc: { count: Number(counter) } },
        { new: true }
      );
      if (data?.modifiedCount >= 0) return data;
      return this.saveNewPostComment({ postId: postId, count: counter });
    } catch (error) {
      return;
    }
  }
}
