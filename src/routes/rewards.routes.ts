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
  routes.get("/", createRewardController);
  routes.get("/:reward_id", rewardListOneController);
  routes.patch("/:reward_id", rewardUpdateOneController);
  routes.delete("/:reward_id", rewardDeleteOneController);

  return routes;
};

export default rewardsRoutes;
