import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostEntity } from "../entities/post.entity";
import { PostInterface } from "../interface/post.interface";

@Injectable()
export class PostRepository {
  constructor(@InjectModel("Post") private postModel: Model<PostInterface>) {}
  public async savePost(body: PostEntity): Promise<PostInterface> {
    const postInterface = new this.postModel(body);
    return postInterface.save();
  }
  public async findByPagination(skip: number, limit: number): Promise<any> {
    const result = await this.postModel
      .find(
        {
          isDeleted: false,
        },
        null,
        { limit: limit, skip: skip }
      )
      .sort({ createdAt: -1 })
      .exec();
    console.log("result", result);
    const postArray = [];
    result.map((data) => {
      postArray.push({
        postId: JSON.parse(JSON.stringify(data._id)),
        userId: data.userId,
        title: data.title,
        image: data.image,
        description: data.description,
        tags: data.tags,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });
    return postArray;
  }
  public async findByPostId(postId: string): Promise<PostInterface> {
    const data = await this.postModel
      .findOne({
        _id: postId,
        isDeleted: false,
      })
      .exec();
    return data;
  }
  public async updatePost(
    body: Partial<PostEntity>,
    postId: string,
    user: any
  ): Promise<any> {
    const data = await this.postModel.findOneAndUpdate(
      { _id: postId, userId: user.userId },
      {
        title: body.title,
        image: body.image,
        description: body.description,
        tags: body.tags,
      },
      { new: true }
    );
    return data;
  }
  public async deletePost(postId: string, userId: string): Promise<any> {
    const data = await this.postModel.findOneAndUpdate(
      { _id: postId, userId: userId },
      {
        isDeleted: true,
      },
      { new: true }
    );
    return data;
  }
}
