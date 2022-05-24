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
} from "../controllers";
import {
  checkAuthUserMiddleware,
  checkCreateUserMiddleware,
} from "../middlewares";
import { createUserSchema } from "../validations";

const routes = Router();

const userRoutes = () => {
  routes.post(
    "/",
    checkCreateUserMiddleware(createUserSchema),
    createUserController
  );
  routes.post("/login", loginUserController);
  routes.get("/", listUsersController);
  routes.get("/:user_id", listOneUserController);
  routes.get("/me", checkAuthUserMiddleware, listMeUserController);
  routes.patch("/:user_id", editOneUserController);
  routes.patch("/me", checkAuthUserMiddleware, editMeUserController);
  routes.delete("/:user_id", deleteOneUserController);
  routes.delete("/me", checkAuthUserMiddleware, deleteMeUserController);

  return routes;
};

export default userRoutes;
