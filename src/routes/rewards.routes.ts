import { Router } from "express";
import { rewardCreateController } from "../controller/rewards/create.controller";
import { rewardDeleteOneController } from "../controller/rewards/deleteOne.controller";
import { rewardListController } from "../controller/rewards/list.controller";
import { rewardListOneController } from "../controller/rewards/listOne.controller";
import rewardUpdateOneController from "../controller/rewards/updateOne.controller";

const routes = Router();

const rewardsRoutes = () => {
  routes.post("/", rewardCreateController);
  routes.get("/", rewardListController);
  routes.get("/:reward_id", rewardListOneController);
  routes.patch("/:reward_id", rewardUpdateOneController);
  routes.delete("/:reward_id", rewardDeleteOneController);

  return routes;
};

export default rewardsRoutes;
