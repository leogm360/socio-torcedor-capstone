import { Router } from "express";
import clubCreateController from "../controller/club/create.controller";
import clubDeleteOneController from "../controller/club/deleteOne.controller";
import clubListController from "../controller/club/list.controller";
import clubListOneController from "../controller/club/listOne.controller";
import clubUpdateOneController from "../controller/club/updateOne.controller";
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
