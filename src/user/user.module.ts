import { Module } from "@nestjs/common";

import { MysqlModule } from "../mysql.module";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [MysqlModule.forFeature("default")],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
