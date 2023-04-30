import { Document } from "mongoose";
export interface UserInterface extends Document {
  readonly username: string;
  readonly refreshToken: string;
  readonly password: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
