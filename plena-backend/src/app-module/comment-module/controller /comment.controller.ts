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
import { ClientProxy } from "@nestjs/microservices";
import { AppInterceptor } from "src/app.interceptor";
import { GetCurrentUser, Public } from "src/common/decorators";
import { Utility } from "src/utils/utility";
import { Logger } from "winston";
import { CommentDto } from "../dto/comment.dto";
import { CommentService } from "../services/comment.service";

@UseInterceptors(AppInterceptor)
@Controller()
@Public()
export class CommentController {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
    private commentService: CommentService,
    private utilityService: Utility,
    @Inject("EVENT_SERVICE") private readonly client: ClientProxy
  ) {}
  @Post()
  public saveComment(
    @Body() body: CommentDto,
    @GetCurrentUser() user: any
  ): Promise<any> {
    this.client.emit("SAVE_COMMENT", { postId: body.postId, count: 1 });
    return this.commentService.save(body, user);
  }
  @Get()
  public getAllComments(@Query() queryParam: any): Promise<any> {
    const { skip, limit, page } = this.utilityService.getPagination(
      queryParam.page,
      queryParam.pageSize
    );
    return this.commentService.findByPagnation(skip, limit, page, undefined);
  }
  @Get("/:postId")
  public getCommentByPostId(
    @Param("postId") postId: string,
    @Query() queryParam: any
  ): Promise<any> {
    const { skip, limit, page } = this.utilityService.getPagination(
      queryParam.page,
      queryParam.pageSize
    );
    return this.commentService.findByPagnation(skip, limit, page, postId);
  }
  @Put("/:commentId")
  public updateComment(
    @Body() body: any,
    @Param("commentId") commentId: string,
    @GetCurrentUser() user: any
  ): Promise<any> {
    return this.commentService.updateByCommentId(body, commentId, user);
  }
  @Delete("/:commentId")
  public async deleteComment(
    @Param("commentId") commentId: string,
    @Query() queryParam: any,
    @GetCurrentUser() user: any
  ): Promise<any> {
    this.client.emit("DELETE_COMMENT", {
      postId: queryParam.postId,
      count: -1,
    });
    const data = await this.commentService.deleteByCommentId(commentId, user);
    return data;
  }
}
