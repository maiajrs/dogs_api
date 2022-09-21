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

    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    
    console.log(userAlreadyExists)

    if(userAlreadyExists) {
      throw new AppError("User Already Exists")
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({name, email, password: passwordHash})
  }
}

export {CreateUserUseCase};