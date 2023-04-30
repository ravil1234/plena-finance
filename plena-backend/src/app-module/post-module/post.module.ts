import { Module } from "@nestjs/common";
import { env } from "src/env";
import { JwtModule } from "@nestjs/jwt";
import { PostService } from "./services/post.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PostRepository } from "./repository/post.repository";
import { Utility } from "src/utils/utility";
import { UserModule } from "../user-module/user.module";
import { PostSchema } from "./entities/post.entity";
import { PostController } from "./controller /post.controller";
@Module({
  imports: [
    JwtModule.register({ secret: env.jwt.accessKey }),
    MongooseModule.forFeature([{ name: "Post", schema: PostSchema }]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, Utility],
  exports: [PostService, PostRepository, Utility],
})
export class PostModule {}
