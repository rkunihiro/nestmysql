import { Controller, Get, Header } from "@nestjs/common";

@Controller()
export class StatusController {
    @Get("/status")
    @Header("Content-Type", "text/plain;charset=UTF-8")
    public status() {
        return "ok";
    }
}
