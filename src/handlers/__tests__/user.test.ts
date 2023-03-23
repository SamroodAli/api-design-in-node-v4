import { Request, Response } from "express";
import * as user from "../user";
import { faker } from "@faker-js/faker";

describe("user handler", () => {
  it("should create a new user", async () => {
    expect.assertions(1);

    const req = {
      body: {
        password: "hi",
        username: faker.name.firstName(),
      },
    };

    const res = {
      json(token: string) {
        expect(token).toBeTruthy();
      },
    };

    await user.createNewUser(req as Request, res as Response, () => {});
  });
});
