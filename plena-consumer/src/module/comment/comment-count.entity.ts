import { Exclude } from "class-transformer";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BeforeInsert } from "typeorm";

@Schema({ timestamps: true })
export class CommentCountEntity {
  @Prop({ required: true, unique: true })
  public postId: string;

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
export const CommentCountSchema =
  SchemaFactory.createForClass(CommentCountEntity);
