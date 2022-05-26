import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import {
  createClubController,
  listClubsController,
  listOneClubController,
  editOneClubController,
  deleteOneClubController,
} from "../controllers";
import { createClubSchema, updateClubSchema } from "../validations";
import {
  checkAuthUserMiddleware,
  checkIsAdminMiddleWare,
} from "../middlewares";

const routes = Router();

const clubRoutes = () => {
  routes.use("/", checkAuthUserMiddleware);
  routes.post(
    "/",
    checkIsAdminMiddleWare,
    expressYupMiddleware({ schemaValidator: createClubSchema }),
    createClubController
  );
  routes.get("/", listClubsController);
  routes.get("/:club_id", listOneClubController);
  routes.patch(
    "/:club_id",
    checkIsAdminMiddleWare,
    expressYupMiddleware({ schemaValidator: updateClubSchema }),
    editOneClubController
  );
  routes.delete("/:club_id", checkIsAdminMiddleWare, deleteOneClubController);

  return routes;
};

export default clubRoutes;
