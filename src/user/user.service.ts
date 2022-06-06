import { Injectable } from "@nestjs/common";

import { InjectMysqlConnection, MysqlPool } from "../mysql.utils";

interface User {
    id: number;
    name: string;
}

@Injectable()
export class UserService {
    constructor(
        @InjectMysqlConnection("default")
        private readonly pool: MysqlPool,
    ) {}

    async findById(id: number): Promise<User | null> {
        return this.pool.fetchRow<User>("SELECT id,name FROM User WHERE id = ?", [id]);
    }

    async findAll(): Promise<User[]> {
        return this.pool.fetchAll<User>("SELECT id,name FROM User ORDER BY id");
    }
}
