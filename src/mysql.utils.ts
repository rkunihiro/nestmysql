import { Inject } from "@nestjs/common";
import {
    //
    Pool,
    PoolConnection,
    QueryOptions,
    ResultSetHeader,
    RowDataPacket,
} from "mysql2/promise";

export function getMysqlConnectionToken(name: string): string {
    return `MYSQL_CONNECTION_${name}`;
}

export function InjectMysqlConnection(name: string): ReturnType<typeof Inject> {
    return Inject(getMysqlConnectionToken(name));
}

class MysqlPoolConnection {
    constructor(private readonly conn: PoolConnection) {}

    async execute(sql: QueryOptions["sql"], values?: QueryOptions["values"]): Promise<ResultSetHeader> {
        const [rs] = await this.conn.execute<ResultSetHeader>(sql, values);
        return rs;
    }

    async fetchAll<T>(sql: QueryOptions["sql"], values?: QueryOptions["values"]): Promise<T[]> {
        const [rows] = await this.conn.execute<RowDataPacket[]>({ sql, values, rowsAsArray: false });
        return rows as T[];
    }

    async fetchRow<T>(sql: QueryOptions["sql"], values?: QueryOptions["values"]): Promise<T | null> {
        const rows = await this.fetchAll<T>(sql, values);
        if (rows.length < 1) {
            return null;
        }
        return rows[0] as T;
    }

    async fetchOne<T>(sql: QueryOptions["sql"], values?: QueryOptions["values"]): Promise<T | null> {
        const [rows] = await this.conn.execute<RowDataPacket[]>({ sql, values, rowsAsArray: true });
        if (rows[0] === undefined || rows[0][0] === undefined) {
            return null;
        }
        return rows[0][0];
    }
}

export class MysqlPool {
    constructor(private readonly pool: Pool) {}

    async getConnection(): Promise<MysqlPoolConnection> {
        const conn = await this.pool.getConnection();
        return new MysqlPoolConnection(conn);
    }

    async execute(sql: QueryOptions["sql"], values?: QueryOptions["values"]): Promise<ResultSetHeader> {
        return (await this.getConnection()).execute(sql, values);
    }

    async fetchAll<T>(sql: QueryOptions["sql"], values?: QueryOptions["values"]): Promise<T[]> {
        return (await this.getConnection()).fetchAll<T>(sql, values);
    }

    async fetchRow<T>(sql: QueryOptions["sql"], values?: QueryOptions["values"]): Promise<T | null> {
        return (await this.getConnection()).fetchRow<T>(sql, values);
    }

    async fetchOne<T>(sql: QueryOptions["sql"], values?: QueryOptions["values"]): Promise<T | null> {
        return (await this.getConnection()).fetchOne<T>(sql, values);
    }
}
