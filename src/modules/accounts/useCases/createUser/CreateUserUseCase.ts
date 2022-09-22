import "reflect-metadata"
import {hash} from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
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
  async execute({name, email, password}: IRequest): Promise<void> {
    console.log(email, password, name);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new AppError("User Already Exists")
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({name, email, password: passwordHash})
  }
}

export {CreateUserUseCase};