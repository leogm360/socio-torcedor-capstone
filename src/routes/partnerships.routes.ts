import { Router } from "express";
import partnershipCreateController from "../controller/partnerships/create.partnership";
import partnershipDeleteController from "../controller/partnerships/delete.partnership";
import partinershipListController from "../controller/partnerships/list.partership";
import partnershipListOneController from "../controller/partnerships/listOne.parnership";
import partnershipUpdateController from "../controller/partnerships/update.partinership";

const routes = Router();

const partnershipsRoutes = () => {
  routes.post("/", partnershipCreateController);
  routes.post("/:partnerships_id/:rewards_id");
  routes.get("/", partinershipListController);
  routes.get("/:partnerships_id", partnershipListOneController);
  routes.patch("/:partnerships_id", partnershipUpdateController);
  routes.delete("/:partnerships_id", partnershipDeleteController);

  return routes;
};

export default partnershipsRoutes;
