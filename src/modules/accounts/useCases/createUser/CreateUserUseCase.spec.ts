import {beforeEach, describe, expect, it} from "vitest"
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/In-Memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUserCase: CreateUserUseCase;

describe("User Create", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUserCase = new CreateUserUseCase(usersRepositoryInMemory)
  })
  it("should be able to create user with email, name and password", async () => {
    await createUserUserCase.execute({
      name: "any_user",
      email: "any_email@mail.com",
      password: "any_password",
    })
    const user = await usersRepositoryInMemory.findByEmail("any_email@mail.com");
    expect(user).toHaveProperty("id")
  })

  it("should not be able to create   user with same email", async () => { 
    await createUserUserCase.execute({
      name: "any_user",  
      email: "any_email@mail.com",
      password: "any_password",
    })

    await expect(
      createUserUserCase.execute({
        name: "any_user",  
        email: "any_email@mail.com",
        password: "any_password"
      })
    ).rejects.toEqual(new AppError("User Already Exists"))
    })
})