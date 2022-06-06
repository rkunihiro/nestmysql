import { Controller, Get, Inject, Param } from "@nestjs/common";

import { UserService } from "./user.service";

@Controller("")
export class UserController {
    constructor(
        @Inject(UserService)
        private readonly service: UserService,
    ) {}

    @Get("/users")
    public async users() {
        return this.service.findAll();
    }

    @Get("/user/:id")
    public async user(@Param("id") id: number) {
        return this.service.findById(id);
    }
}
