import {hash} from "bcrypt";
import { inject, injectable } from "tsyringe";
import { User } from "../../infra/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export interface IResponse {
  id: string;
  name: string;
  email: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
    ) {}
  async execute({name, email, password}: IRequest): Promise<IResponse> {

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({name, email, password: passwordHash})

    return user;
  }
}

export {CreateUserUseCase};