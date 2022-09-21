import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import {PrismaClient} from "@prisma/client";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  async create ({ name, email, password }: ICreateUserDTO): Promise<Omit<User, "password">> {
    const prisma = new PrismaClient({
      log: ["query"]
    })
    const user = await prisma.users.create({
      data: {
        name, 
        email,
        password
      }
    })
    console.log(user)
    delete user.password;
    return user;
  }

}

export {UsersRepository};