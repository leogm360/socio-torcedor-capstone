import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import partnershipCreateController from "../controllers/partnerships/create.partnership";
import partnershipDeleteController from "../controllers/partnerships/delete.partnership";
import partinershipListController from "../controllers/partnerships/list.partership";
import partnershipListOneController from "../controllers/partnerships/listOne.parnership";
import partnershipUpdateController from "../controllers/partnerships/update.partinership";
import createPartnershipSchema from "../validations/partnerships/createPartnership.validation";
import updatePartnershipSchema from "../validations/partnerships/updatePartnership.validation";

const routes = Router();

const partnershipsRoutes = () => {
  routes.post(
    "/",
    expressYupMiddleware({ schemaValidator: createPartnershipSchema }),
    partnershipCreateController
  );
  routes.post("/:partnership_id/:reward_id");
  routes.get("/", partinershipListController);
  routes.get("/:partnership_id", partnershipListOneController);
  routes.patch(
    "/:partnership_id",
    expressYupMiddleware({ schemaValidator: updatePartnershipSchema }),
    partnershipUpdateController
  );
  routes.delete("/:partnership_id", partnershipDeleteController);

  return routes;
};

export default partnershipsRoutes;
