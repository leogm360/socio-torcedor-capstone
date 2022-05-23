import { Router } from "express";
import clubCreateController from "../controllers/club/create.controller";
import clubDeleteOneController from "../controllers/club/deleteOne.controller";
import clubListController from "../controllers/club/list.controller";
import clubListOneController from "../controllers/club/listOne.controller";
import clubUpdateOneController from "../controllers/club/updateOne.controller";
import { expressYupMiddleware } from "express-yup-middleware";
import createClubSchema from "../validations/club/createClub.validation";
import updateClubSchema from "../validations/club/updateClub.validation";

const routes = Router();

const clubRoutes = () => {
  routes.post(
    "/",
    expressYupMiddleware({ schemaValidator: createClubSchema }),
    clubCreateController
  );
  routes.get("/", clubListController);
  routes.get("/:club_id", clubListOneController);
  routes.patch(
    "/:club_id",
    expressYupMiddleware({ schemaValidator: updateClubSchema }),
    clubUpdateOneController
  );
  routes.delete("/:club_id", clubDeleteOneController);

  return routes;
};

export default clubRoutes;
