import { Server } from "node:http";

import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

export async function main(port: number): Promise<void> {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({}));

    const httpServer: Server = await app.listen(port);

    httpServer.keepAliveTimeout = 60000;
    httpServer.headersTimeout = 60000;
}

if (require.main === module) {
    main(3000).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
