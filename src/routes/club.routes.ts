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

const routes = Router();

const clubRoutes = () => {
  routes.post(
    "/",
    expressYupMiddleware({ schemaValidator: createClubSchema }),
    createClubController
  );
  routes.get("/", listClubsController);
  routes.get("/:club_id", listOneClubController);
  routes.patch(
    "/:club_id",
    expressYupMiddleware({ schemaValidator: updateClubSchema }),
    editOneClubController
  );
  routes.delete("/:club_id", deleteOneClubController);

  return routes;
};

export default clubRoutes;
