interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IResponseUserDTO {
  id: string;
  name: string;
  email: string;
}

export {ICreateUserDTO, IResponseUserDTO};