import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { CommentEntity } from "../entities/comment.entity";
import { CommentInterface } from "../interface/comment.interface";
import { CommentResponseInterface } from "../interface/response/comment.response";
import { CommentRepository } from "../repository/comment.repository";
const _ = require("lodash");
@Injectable()
export class CommentService {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
    private commentRepository: CommentRepository
  ) {}
  public async save(body: any, user: any): Promise<CommentEntity | any> {
    try {
      body["userId"] = user.userId;
      const commentModelEntity = Object.assign(body, new CommentEntity());
      const data = await this.commentRepository.save(commentModelEntity);
      return { ...this.commentResponse(data) };
    } catch (error) {
      throw new BadRequestException("Internal Server Error");
    }
  }
  public async findByPagnation(
    skip: number,
    limit: number,
    page: number,
    postId: string
  ) {
    try {
      const data = await this.commentRepository.findByPagination(
        skip,
        limit + 1,
        postId ? { postId: postId } : {}
      );
      const nextPage = data.length < limit + 1 ? null : Number(page) + 1;
      const docs = data.length < limit + 1 ? data : data.slice(0, limit + 1);
      return {
        docs: docs,
        nextPage: nextPage,
      };
    } catch (error) {
      console.log("Error", error);
      return {
        docs: [],
        nextPage: null,
      };
    }
  }
  public async deleteByCommentId(commentId: string, user: any): Promise<any> {
    try {
      return this.commentRepository.deleteComment(commentId, user.userId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }
  public async updateByCommentId(
    body: any,
    commentId: string,
    user: any
  ): Promise<any> {
    try {
      return this.commentRepository.updateComment(body, commentId, user.userId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }

  private commentResponse(
    commentModel: CommentInterface
  ): CommentResponseInterface {
    return {
      commentId: commentModel._id,
      postId: commentModel.postId,
      userId: commentModel.userId,
      text: commentModel.text,
      createdAt: commentModel.createdAt,
      updatedAt: commentModel.updatedAt,
    };
  }
}
