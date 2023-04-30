import { Exclude } from "class-transformer";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BeforeInsert } from "typeorm";

@Schema({ timestamps: true })
export class CommentEntity {
  @Prop({ required: true })
  public text: string;

  @Prop({ required: true })
  public postId: string;

  @Prop({ required: true })
  public userId: string;

  @Exclude()
  @Prop({ default: false })
  public isDeleted: boolean;

  @BeforeInsert()
  beforeInsertActions(): void {
    this.isDeleted = false;
  }
}
export const CommentSchema = SchemaFactory.createForClass(CommentEntity);
