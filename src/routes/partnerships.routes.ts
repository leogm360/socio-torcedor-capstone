import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import {
  createPartnershipController,
  listPartinershipsController,
  listOnePartnershipController,
  editOnePartnershipController,
  deleteOnePartnershipController,
} from "../controllers";
import {
  createPartnershipSchema,
  updatePartnershipSchema,
} from "../validations";
import {
  checkAuthUserMiddleware,
  checkIsAdminMiddleWare,
} from "../middlewares";

const routes = Router();

const partnershipsRoutes = () => {
  routes.use("/", checkAuthUserMiddleware);
  routes.post(
    "/",
    checkIsAdminMiddleWare,
    expressYupMiddleware({ schemaValidator: createPartnershipSchema }),
    createPartnershipController
  );
  routes.post("/:partnership_id/:reward_id");
  routes.get("/", listPartinershipsController);
  routes.get("/:partnership_id", listOnePartnershipController);
  routes.patch(
    "/:partnership_id",
    checkIsAdminMiddleWare,
    expressYupMiddleware({ schemaValidator: updatePartnershipSchema }),
    editOnePartnershipController
  );
  routes.delete(
    "/:partnership_id",
    checkIsAdminMiddleWare,
    deleteOnePartnershipController
  );

  return routes;
};

export default partnershipsRoutes;
