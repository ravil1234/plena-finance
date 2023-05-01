import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { env } from "./env";
import { CommentCountController } from "./module/comment/comment-count.controller";
import { CommentCountSchema } from "./module/comment/comment-count.entity";
import { CommentCountRepository } from "./module/comment/comment-count.repository";
import { PostTagController } from "./module/post/post-tag.controller";
import { PostTagSchema } from "./module/post/post-tag.entity";
import { PostTagRepository } from "./module/post/post-tag.repository";

@Module({
  imports: [
    MongooseModule.forRoot(`${env.mongoDb.uri}`),
    MongooseModule.forFeature([
      { name: "CommentCount", schema: CommentCountSchema },
      { name: "PostTag", schema: PostTagSchema },
    ]),
  ],
  controllers: [AppController, PostTagController, CommentCountController],
  providers: [AppService, PostTagRepository, CommentCountRepository],
})
export class AppModule {}
