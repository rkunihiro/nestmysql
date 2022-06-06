import { Test } from "@nestjs/testing";

import { getMysqlConnectionToken } from "../mysql.utils";

import { UserService } from "./user.service";

describe("UserService", () => {
    const mockMysqlPool = {
        fetchAll: jest.fn(),
        fetchRow: jest.fn(),
        fetchOne: jest.fn(),
    };
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: getMysqlConnectionToken("default"),
                    useValue: mockMysqlPool,
                },
                UserService,
            ],
        }).compile();
        userService = moduleRef.get<UserService>(UserService);
    });

    test("findById", async () => {
        mockMysqlPool.fetchRow.mockImplementation(async () => {
            return { id: 123, name: "foo" };
        });

        const user = await userService.findById(123);

        expect(mockMysqlPool.fetchRow.mock.calls[0][1]).toEqual([123]);
        expect(user).toEqual({ id: 123, name: "foo" });
    });
});
