import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PostTagEntity } from "./post-tag.entity";
import { PostTagInterface } from "./post-tag.interface";

@Injectable()
export class PostTagRepository {
  constructor(
    @InjectModel("PostTag") private postTagModel: Model<PostTagInterface>
  ) {}
  public async saveNewTag(
    body: Partial<PostTagEntity>
  ): Promise<PostTagInterface> {
    const postInterface = new this.postTagModel(body);
    return postInterface.save();
  }
  public async updateTagCount(tag: string): Promise<any> {
    try {
      const data = await this.postTagModel.updateOne(
        { postTag: tag },
        { $inc: { count: 1 } },
        { new: true }
      );
      if (data?.modifiedCount >= 0) return data;
      return this.saveNewTag({ postTag: tag, count: 1 });
    } catch (error) {
      return;
    }
  }
}
