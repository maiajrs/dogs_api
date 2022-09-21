import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/entities/User";

interface IUsersRepository {
  create({name, email, password}: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
}

export {IUsersRepository};