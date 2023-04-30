import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { env } from "../env";
console.log("envs: Mysql", env.mysqlDb);
console.log("envs: MongoDb", env.mongoDb);
console.log(
  "path Mongo Entity:",
  join(__dirname, "..", "**", "**", "*.mongo.{js,ts}")
);
// console.log(
//   "path Sql Entity:",
//   join(__dirname, "..", "**", "**", "*.entity.{js,ts}")
// );
// export const mysqlConfig: TypeOrmModuleOptions = {
//   name: "default",
//   type: "mysql",
//   logging: true,
//   charset: "utf8mb4",
//   replication: {
//     master: {
//       host: env.mysqlDb.host,
//       port: 3306,
//       username: env.mysqlDb.username,
//       password: env.mysqlDb.password,
//       database: env.mysqlDb.database,
//     },
//     slaves: [
//       {
//         host: env.mysqlDb.reader,
//         port: 3306,
//         username: env.mysqlDb.username,
//         password: env.mysqlDb.password,
//         database: env.mysqlDb.database,
//       },
//     ],
//   },
//   synchronize: Boolean(env.mysqlDb.synchronize) || false,
//   migrationsRun: false,
//   entities: [join(__dirname, "..", "**", "**", "*.entity.{js,ts}")],
// };
export const mongoConfig: TypeOrmModuleOptions = {
  name: "default",
  type: "mongodb",
  host: env.mongoDb.host,
  port: env.mongoDb.port,
  database: env.mongoDb.database,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [join(__dirname, "..", "**", "**", "*.mongo.{js,ts}")],
};
