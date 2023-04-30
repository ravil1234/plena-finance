import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { AppInterceptor } from "src/app.interceptor";
import { GetCurrentUser, Public } from "src/common/decorators";
import { Utility } from "src/utils/utility";
import { Logger } from "winston";
import { PostService } from "../services/post.service";

@UseInterceptors(AppInterceptor)
@Controller()
export class PostController {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
    private postService: PostService,
    private utilityService: Utility
  ) {}
  @Post()
  public savePost(
    @Body() body: any,
    @GetCurrentUser() user: any
  ): Promise<any> {
    return this.postService.save(body, user);
  }
  @Get()
  public getAllPost(@Query() queryParam: any): Promise<any> {
    const { skip, limit, page } = this.utilityService.getPagination(
      queryParam.page,
      queryParam.pageSize
    );
    return this.postService.findByPagnation(skip, limit, page);
  }
  @Get("/:postId")
  public getPost(
    @Param("postId") postId: string,
    @GetCurrentUser() user: any
  ): Promise<any> {
    return this.postService.getPostByPostId(postId);
  }
  @Put("/:postId")
  public updatePost(
    @Body() body: any,
    @Param("postId") postId: string,
    @GetCurrentUser() user: any
  ): Promise<any> {
    return this.postService.updateByPostId(body, postId, user);
  }
  @Delete("/:postId")
  public async deletePost(
    @Param("postId") postId: string,
    @GetCurrentUser() user: any
  ): Promise<any> {
    const data = await this.postService.deleteByPostId(postId, user.userId);
    return data;
  }
}
