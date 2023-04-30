import { Document } from "mongoose";
export interface PostInterface extends Document {
  readonly userId: string;
  readonly image: string;
  readonly title: string;
  readonly tags: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
