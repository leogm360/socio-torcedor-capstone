import { Router } from "express";

const routes = Router();

const rewardsRoutes = () => {
  routes.post("/");
  routes.get("/");
  routes.get("/:rewards_id");
  routes.patch("/:rewards_id");
  routes.delete("/:rewards_id");

  return routes;
};

export default rewardsRoutes;
