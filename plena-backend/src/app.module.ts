import { Module } from "@nestjs/common";
import { APP_GUARD, RouterModule } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { winstonOptions } from "./libs/logger/logger";
import { BaseModule } from "./app-module/base/base.module";
import { UserModule } from "./app-module/user-module/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AccessTokenGuard } from "./common/guards";
import { mongoConfig } from "./database/typeorm.config";
import { PostModule } from "./app-module/post-module/post.module";
import { CommentModule } from "./app-module/comment-module/comment.module";
import { env } from "./env";

@Module({
  imports: [
    MongooseModule.forRoot(env.mongoDb.uri, {
      dbName: env.mongoDb.database,
    }),
    WinstonModule.forRoot(winstonOptions),
    RouterModule.register([
      {
        path: "/user",
        module: UserModule,
      },
      {
        path: "/post",
        module: PostModule,
      },
      {
        path: "/comment",
        module: CommentModule,
      },
    ]),
    UserModule,
    PostModule,
    CommentModule,
    BaseModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AppService,
  ],
})
export class AppModule {}
