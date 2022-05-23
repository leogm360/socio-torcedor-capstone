import { Router } from "express";

import {
  createUserController,
  loginUserController,
  listUsersController,
  listOneUserController,
  listMeUserController,
  editOneUserController,
  editMeUserController,
  deleteOneUserController,
  deleteMeUserController,
} from "../controllers/users";

const routes = Router();

const userRoutes = () => {
  routes.post("/", createUserController);
  routes.post("/login", loginUserController);
  routes.get("/", listUsersController);
  routes.get("/:user_id", listOneUserController);
  routes.get("/me", listMeUserController);
  routes.patch("/:user_id", editOneUserController);
  routes.patch("/me", editMeUserController);
  routes.delete("/:user_id", deleteOneUserController);
  routes.delete("/me", deleteMeUserController);

  return routes;
};

export default userRoutes;
