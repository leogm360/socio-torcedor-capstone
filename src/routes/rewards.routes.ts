import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import {
  createRewardController,
  listRewardsController,
  listOneRewardController,
  editOneRewardController,
  deleteOneRewardController,
} from "../controllers";
import { createRewardSchema, updateRewardSchema } from "../validations";
import {
  checkAuthUserMiddleware,
  checkIsAdminMiddleWare,
} from "../middlewares";

const routes = Router();

const rewardsRoutes = () => {
  routes.use("/", checkAuthUserMiddleware);
  routes.post(
    "/",
    checkIsAdminMiddleWare,
    expressYupMiddleware({ schemaValidator: createRewardSchema }),
    createRewardController
  );
  routes.get("/", listRewardsController);
  routes.get("/:reward_id", listOneRewardController);
  routes.patch(
    "/:reward_id",
    checkIsAdminMiddleWare,
    expressYupMiddleware({ schemaValidator: updateRewardSchema }),
    editOneRewardController
  );
  routes.delete(
    "/:reward_id",
    checkIsAdminMiddleWare,
    deleteOneRewardController
  );

  return routes;
};

export default rewardsRoutes;
