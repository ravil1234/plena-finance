import { Exclude } from "class-transformer";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BeforeInsert } from "typeorm";
class BaseEntity {
  @Exclude()
  @Prop({ default: false })
  public isDeleted: boolean;
  @BeforeInsert()
  beforeInsertActions(): void {
    this.isDeleted = false;
  }
}
@Schema({ timestamps: true })
export class UserEntity extends BaseEntity {
  @Prop({ unique: true })
  public username: string;
  @Prop({ name: "refreshToken", required: false })
  public refreshToken: string;
  @Prop({ name: "password", required: false })
  public password: string;
}
export const UserSchema = SchemaFactory.createForClass(UserEntity);
