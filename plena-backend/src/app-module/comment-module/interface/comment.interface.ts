import { Document } from "mongoose";
export interface CommentInterface extends Document {
  readonly text: string;
  readonly userId: string;
  readonly postId: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
