import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import {
  createPartnershipController,
  listPartinershipsController,
  listOnePartnershipController,
  editOnePartnershipController,
  deleteOnePartnershipController,
} from "../controllers";
import { createPartnershipSchema } from "../validations";

const routes = Router();

const partnershipsRoutes = () => {
  routes.post(
    "/",
    expressYupMiddleware({ schemaValidator: createPartnershipSchema }),
    createPartnershipController
  );
  routes.post("/:partnership_id/:reward_id");
  routes.get("/", listPartinershipsController);
  routes.get("/:partnership_id", listOnePartnershipController);
  routes.patch("/:partnership_id", editOnePartnershipController);
  routes.delete("/:partnership_id", deleteOnePartnershipController);

  return routes;
};

export default partnershipsRoutes;
