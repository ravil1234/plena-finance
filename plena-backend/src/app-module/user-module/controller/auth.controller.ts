import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { AppInterceptor } from "src/app.interceptor";
import { Public } from "src/common/decorators";
import { Logger } from "winston";
import { CreateUserDto } from "../dto/create.dto";
import { UserEntity } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@UseInterceptors(AppInterceptor)
@Controller("/auth")
export class AuthController {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
    private userService: UserService
  ) {}

  @Public()
  @Post("/signup")
  @HttpCode(200)
  public signup(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.userSignup(body);
  }
  @Public()
  @Post("/login")
  @HttpCode(200)
  public login(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.userLogin(body);
  }
}
