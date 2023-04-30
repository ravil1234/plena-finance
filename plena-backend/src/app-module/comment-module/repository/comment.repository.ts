import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CommentEntity } from "../entities/comment.entity";
import { CommentInterface } from "../interface/comment.interface";

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel("Comment") private commentModel: Model<CommentInterface>
  ) {}
  public async save(body: CommentEntity): Promise<CommentInterface> {
    const commentInterface = new this.commentModel(body);
    return commentInterface.save();
  }
  public async findByPagination(
    skip: number,
    limit: number,
    condition: any
  ): Promise<any> {
    const result = await this.commentModel
      .find(
        {
          ...condition,
          isDeleted: false,
        },
        null,
        { limit: limit, skip: skip }
      )
      .sort({ createdAt: -1 })
      .exec();
    console.log("result", result);
    const commentArray = [];
    result.map((data) => {
      commentArray.push({
        postId: data.userId,
        userId: data.userId,
        commentId: JSON.parse(JSON.stringify(data._id)),
        text: data.text,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });
    return commentArray;
  }
  public async findByCommentId(commentId: string) {
    const data = await this.commentModel
      .findOne({
        isDeleted: false,
        commentId: commentId,
      })
      .sort({ createdAt: -1 })
      .exec();
    return data;
  }
  public async updateComment(
    body: Partial<CommentEntity>,
    commentId: string,
    currentUserId: string
  ): Promise<any> {
    const data = await this.commentModel.findOneAndUpdate(
      { _id: commentId, userId: currentUserId },
      {
        text: body.text,
      },
      { new: true }
    );
    return data;
  }
  public async deleteComment(
    commentId: string,
    currentUserId: string
  ): Promise<any> {
    const data = await this.commentModel.findOneAndUpdate(
      { _id: commentId, userId: currentUserId },
      {
        isDeleted: true,
      },
      { new: true }
    );
    return data;
  }
  public async findByUserId(userId: string) {
    const data = await this.commentModel
      .findOne({
        isDeleted: false,
        userId: userId,
      })
      .sort({ createdAt: -1 })
      .exec();
    return data;
  }
}
