import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommentCountSchema } from "./module/comment/comment-count.entity";
import { CommentController } from "./module/comment/consumer.controller";
import { PostTagController } from "./module/post/post-tag.controller";
import { PostTagSchema } from "./module/post/post-tag.entity";

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    MongooseModule.forFeature([
      { name: "CommentCount", schema: CommentCountSchema },
      { name: "PostTag", schema: PostTagSchema },
    ]),
  ],
  controllers: [AppController, PostTagController, CommentController],
  providers: [AppService],
})
export class AppModule {}
