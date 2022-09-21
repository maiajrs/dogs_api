import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];
  async create ({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {name, email, password});
    this.users.push(user);

    return user;
  }

}

export {UsersRepositoryInMemory};