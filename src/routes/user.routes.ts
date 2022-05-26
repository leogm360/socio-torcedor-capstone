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
  checkEditUserMiddleware,
} from "../middlewares";
import { createUserSchema, editUserSchema } from "../validations";

const routes = Router();

const userRoutes = () => {
  routes.post(
    "/",
    checkCreateUserMiddleware(createUserSchema),
    createUserController
  );
  routes.post("/login", loginUserController);

  routes.use("/", checkAuthUserMiddleware);
  routes.get("/", listUsersController);
  routes.get("/me", listMeUserController);
  routes.get("/:user_id", listOneUserController);
  routes.patch(
    "/me",
    checkEditUserMiddleware(editUserSchema),
    editMeUserController
  );
  routes.patch(
    "/:user_id",
    checkEditUserMiddleware(editUserSchema),
    editOneUserController
  );
  routes.delete("/me", deleteMeUserController);
  routes.delete("/:user_id", deleteOneUserController);

  return routes;
};

export default userRoutes;
