import "reflect-metadata"
import express from "express";
import { CreateUserControllre } from "./modules/accounts/useCases/createUser/CreateUserController";

import "./shared/container"

const app = express();
app.use(express.json());

const createUserController = new CreateUserControllre();

app.post('/users', createUserController.handle)

app.listen(3333, () => console.log("server is running..."));