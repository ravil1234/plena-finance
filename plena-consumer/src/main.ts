import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { env } from "./env";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [env.rabbitMq.url],
      queue: "ACTION_CONSUMER",
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
}
bootstrap();
