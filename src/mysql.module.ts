import { DynamicModule, FactoryProvider, Module } from "@nestjs/common";
import { createPool, PoolOptions } from "mysql2/promise";

import { getMysqlConnectionToken, MysqlPool } from "./mysql.utils";

@Module({})
export class MysqlModule {
    static poolMap = new Map<string, MysqlPool>();

    static forRoot(name: string, options: PoolOptions): DynamicModule {
        const provider: FactoryProvider = {
            provide: getMysqlConnectionToken(name),
            useFactory: async () => {
                const pool = new MysqlPool(createPool(options));
                MysqlModule.poolMap.set(name, pool);
                return pool;
            },
        };
        return {
            module: MysqlModule,
            providers: [provider],
            exports: [provider],
        };
    }

    static forFeature(name: string): DynamicModule {
        const provider: FactoryProvider = {
            provide: getMysqlConnectionToken(name),
            useFactory: async () => {
                return MysqlModule.poolMap.get(name);
            },
        };
        return {
            module: MysqlModule,
            providers: [provider],
            exports: [provider],
        };
    }
}
