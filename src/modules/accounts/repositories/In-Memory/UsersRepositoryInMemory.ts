import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];
  async create ({ name, email, password }: ICreateUserDTO): Promise<void> {

    const user = new User();

    Object.assign(user, {name, email, password});
    this.users.push(user);
  }

  async findByEmail (email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)

    return user
  }
}

export {UsersRepositoryInMemory};