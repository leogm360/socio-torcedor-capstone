import { Router } from "express";
import clubCreateController from "../controller/club/create.controller";
import clubDeleteOneController from "../controller/club/deleteOne.controller";
import clubListController from "../controller/club/list.controller";
import clubListOneController from "../controller/club/listOne.controller";
import clubUpdateController from "../controller/club/updateOne.controller";

const routes = Router();

const clubRoutes = () => {
  routes.post("/", clubCreateController);
  routes.get("/", clubListController);
  routes.get("/:club_id", clubListOneController);
  routes.patch("/:club_id", clubUpdateController);
  routes.delete("/:club_id", clubDeleteOneController);

  return routes;
};

export default clubRoutes;
