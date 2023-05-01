import { Document } from "mongoose";
export interface PostTagInterface extends Document {
  readonly postTag: string;
  readonly count: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
