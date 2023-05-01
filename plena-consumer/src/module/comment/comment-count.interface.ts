import { Document } from "mongoose";
export interface CommentCountInterface extends Document {
  readonly postId: string;
  readonly count: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
