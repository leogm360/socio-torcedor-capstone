import { Router } from "express";

import { expressYupMiddleware } from "express-yup-middleware";

import {
  createRewardController,
  listRewardsController,
  listOneRewardController,
  editOneRewardController,
  deleteOneRewardController,
} from "../controllers/rewards";

import createRewardSchema from "../validations/rewards/createReward.validation";

const routes = Router();

const rewardsRoutes = () => {
  routes.post(
    "/",
    expressYupMiddleware({ schemaValidator: createRewardSchema }),
    createRewardController
  );
  routes.get("/", listRewardsController);
  routes.get("/:reward_id", listOneRewardController);
  routes.patch("/:reward_id", editOneRewardController);
  routes.delete("/:reward_id", deleteOneRewardController);

  return routes;
};

export default rewardsRoutes;
