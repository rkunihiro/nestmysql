import { Module } from "@nestjs/common";

import { MysqlModule } from "./mysql.module";
import { StatusController } from "./status.controller";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        //
        MysqlModule.forRoot("default", {
            uri: "mysql://user:password@localhost:3306/dbname?timezone=Z",
            // timezone: "Z",
        }),

        UserModule,
    ],
    providers: [],
    controllers: [StatusController],
})
export class AppModule {}
