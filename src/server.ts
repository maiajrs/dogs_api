import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { CreateUserControllre } from "./modules/accounts/useCases/createUser/CreateUserController";

import "./shared/container"
import { AppError } from "./shared/errors/AppError";

const app = express();
app.use(express.json());

const createUserController = new CreateUserControllre();

app.post('/users', createUserController.handle)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({message: err.message})
  }

  return response.status(500).json({status: "error", message: `Internal Server Error - ${err.message}`})
})

app.listen(3333, () => console.log("server is running..."));