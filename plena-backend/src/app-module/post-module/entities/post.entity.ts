import { Exclude } from "class-transformer";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BeforeInsert } from "typeorm";

@Schema({ timestamps: true })
export class PostEntity {
  @Prop({ required: true })
  public image: string;

  @Prop({ required: true })
  public userId: string;

  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ required: false })
  public tags: string;

  @Exclude()
  @Prop({ default: false })
  public isDeleted: boolean;

  @BeforeInsert()
  beforeInsertActions(): void {
    this.isDeleted = false;
  }
}
export const PostSchema = SchemaFactory.createForClass(PostEntity);
