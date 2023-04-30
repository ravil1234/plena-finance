import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { PostEntity } from "../entities/post.entity";
import { PostInterface } from "../interface/post.interface";
import { PostResponseInterface } from "../interface/response/post.response";
import { PostRepository } from "../repository/post.repository";
const _ = require("lodash");
@Injectable()
export class PostService {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
    private postRepository: PostRepository
  ) {}
  public async save(body: any, user: any): Promise<PostEntity | any> {
    try {
      body["userId"] = user.userId;
      const postModelEntity = Object.assign(body, new PostEntity());
      const data = await this.postRepository.savePost(postModelEntity);
      return { ...this.postResponse(data) };
    } catch (error) {
      throw new BadRequestException("Internal Server Error");
    }
  }
  public async findByPagnation(skip: number, limit: number, page: number) {
    try {
      const data = await this.postRepository.findByPagination(skip, limit + 1);
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
  public async getPostByPostId(postId: string): Promise<any> {
    try {
      return this.postRepository.findByPostId(postId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }
  public async deleteByPostId(postId: string, userId: string): Promise<any> {
    try {
      return this.postRepository.deletePost(postId, userId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }
  public async updateByPostId(
    body: any,
    postId: string,
    user: any
  ): Promise<any> {
    try {
      return this.postRepository.updatePost(body, postId, user);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }

  private postResponse(postModel: PostInterface): PostResponseInterface {
    return {
      postId: postModel._id,
      userId: postModel.userId,
      title: postModel.title,
      description: postModel.description,
      image: postModel.image,
      tags: postModel.tags,
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    };
  }
}
