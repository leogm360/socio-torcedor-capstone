import { Router } from "express";
import partnershipCreateController from "../controller/partnerships/create.partnership";
import partnershipDeleteController from "../controller/partnerships/delete.partnership";
import partinershipListController from "../controller/partnerships/list.partership";
import partnershipListOneController from "../controller/partnerships/listOne.parnership";
import partnershipUpdateController from "../controller/partnerships/update.partinership";

const routes = Router();

const partnershipsRoutes = () => {
  routes.post("/", partnershipCreateController);
  routes.post("/:partnership_id/:reward_id");
  routes.get("/", partinershipListController);
  routes.get("/:partnership_id", partnershipListOneController);
  routes.patch("/:partnership_id", partnershipUpdateController);
  routes.delete("/:partnership_id", partnershipDeleteController);

  return routes;
};

export default partnershipsRoutes;
