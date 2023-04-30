import { Exclude } from "class-transformer";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BeforeInsert } from "typeorm";

@Schema({ timestamps: true })
export class PostTagEntity {
  @Prop({ required: true, unique: true })
  public postTag: string;

  @Prop({ required: true, default: 0 })
  public count: number;

  @Exclude()
  @Prop({ default: false })
  public isDeleted: boolean;

  @BeforeInsert()
  beforeInsertActions(): void {
    this.isDeleted = false;
  }
}
export const PostTagSchema = SchemaFactory.createForClass(PostTagEntity);
