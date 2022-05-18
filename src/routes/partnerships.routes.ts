import { Router } from "express";

const routes = Router();

const partnershipsRoutes = () => {
  routes.post("/");
  routes.post("/:partnerships_id/:rewards_id");
  routes.get("/");
  routes.get("/:partnerships_id");
  routes.patch("/:partnerships_id");
  routes.delete("/:partnerships_id");

  return routes;
};

export default partnershipsRoutes;
