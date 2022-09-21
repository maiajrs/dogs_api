import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import {PrismaClient} from "@prisma/client";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private prisma = new PrismaClient({
    log: ["query"]
  })
  async create ({ name, email, password }: ICreateUserDTO): Promise<void> {
    await this.prisma.users.create({
      data: {
        name, 
        email,
        password
      }
    })
  }

  async findByEmail (email: string): Promise<User> {
    const user = this.prisma.users.findFirst({
      where: {
        email
      }
    })
    return user;
  }

}

export {UsersRepository};