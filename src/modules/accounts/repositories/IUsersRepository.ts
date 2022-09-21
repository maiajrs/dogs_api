import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/entities/User";

interface IUsersRepository {
create({name, email, password}: ICreateUserDTO): Promise<Omit<User, "password">>
}

export {IUsersRepository};