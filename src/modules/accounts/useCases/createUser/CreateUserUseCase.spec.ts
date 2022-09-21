import {beforeEach, describe, expect, it} from "vitest"
import { UsersRepositoryInMemory } from "../../repositories/In-Memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: IUsersRepository;
let createUserUserCase: CreateUserUseCase;

describe("User Create", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUserCase = new CreateUserUseCase(usersRepositoryInMemory)
  })
  it("should be able to create an user", async () => {
    const user = await createUserUserCase.execute({
      name: "Bobby",
      email: "bobby@mail.com",
      password: "1234"
    })
    console.log(user)
    expect(user).toHaveProperty("id")
  })
})