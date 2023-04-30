import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create.dto";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
const _ = require("lodash");
import { uuid } from "uuidv4";
import { JwtToken } from "src/types/jwt-token.type";
import { env } from "src/env";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}
  public async userSignup(body: CreateUserDto): Promise<UserEntity | any> {
    try {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
      const userEntity = Object.assign(body, new UserEntity());
      userEntity.refreshToken = uuid();
      const data = await this.userRepository.saveUser(userEntity);
      const token = await this.generateJwtTokens({
        userId: data._id,
        username: data.username,
      });
      return {
        userId: data._id,
        username: data.username,
        refreshToken: data.refreshToken,
        jwtToken: token.accessToken,
      };
    } catch (error) {
      console.log("error", error);
      if (error.code === 11000)
        throw new BadRequestException("User already Exists");
      else {
        throw new BadRequestException("Internal Server Error");
      }
    }
  }
  public async userLogin(body: CreateUserDto): Promise<UserEntity | any> {
    try {
      const data = await this.userRepository.findByUsername(body.username);
      if (!data) throw new BadRequestException("User not exists!");
      const isPasswordCorrect = await bcrypt.compare(
        body.password,
        data.password
      );
      if (!isPasswordCorrect)
        throw new BadRequestException("Incorrect password");
      const refreshToken = uuid();
      const token = await this.generateJwtTokens({
        userId: data._id,
        username: data.username,
      });
      this.userRepository.updateRefreshToken(refreshToken, data._id);
      return {
        userId: data._id,
        username: data.username,
        refreshToken: refreshToken,
        jwtToken: token.accessToken,
      };
    } catch (error) {
      console.log("error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }
  private async generateJwtTokens(
    user: Partial<UserEntity | any>
  ): Promise<JwtToken> {
    const [accessKey] = await Promise.all([
      this.jwtService.signAsync(user, {
        secret: env.jwt.accessKey,
        expiresIn: env.jwt.expirationTime,
      }),
    ]);
    return {
      accessToken: accessKey,
    };
  }
  public async findByPagnation(skip: number, limit: number, page: number) {
    try {
      const data = await this.userRepository.findByPagination(skip, limit + 1);
      const nextPage = data.length < limit + 1 ? null : Number(page) + 1;
      const docs = data.length < limit + 1 ? data : data.slice(0, limit + 1);
      return {
        docs: docs,
        nextPage: nextPage,
      };
    } catch (error) {
      console.log("Error", error);
      return {
        docs: [],
        nextPage: null,
      };
    }
  }
  public async deleteByUserId(userId: string): Promise<any> {
    try {
      return this.userRepository.deleteUser(userId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }
  public async updateByUserId(body: any, userId: string): Promise<any> {
    try {
      return this.userRepository.updateUser(body, userId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }
}
