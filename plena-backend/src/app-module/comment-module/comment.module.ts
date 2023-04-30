import { Module } from "@nestjs/common";
import { env } from "src/env";
import { JwtModule } from "@nestjs/jwt";
import { CommentController } from "./controller /comment.controller";
import { CommentService } from "./services/comment.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentSchema } from "./entities/comment.entity";
import { CommentRepository } from "./repository/comment.repository";
import { Utility } from "src/utils/utility";
import { UserModule } from "../user-module/user.module";
@Module({
  imports: [
    JwtModule.register({ secret: env.jwt.accessKey }),
    MongooseModule.forFeature([{ name: "Comment", schema: CommentSchema }]),
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, Utility],
  exports: [CommentService, CommentRepository, Utility],
})
export class CommentModule {}
