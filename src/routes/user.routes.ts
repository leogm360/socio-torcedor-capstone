import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";

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
import { checkAuthUserMiddleware } from "../middlewares/checks";
import createUserSchema from "../validations/users/createUser.validation";

const routes = Router();

const userRoutes = () => {
  routes.post(
    "/",
    expressYupMiddleware({ schemaValidator: createUserSchema }),
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
