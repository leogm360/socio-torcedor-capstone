import { Router } from "express";

const routes = Router();

const clubRoutes = () => {
  routes.post("/");
  routes.get("/");
  routes.get("/:club_id");
  routes.patch("/:club_id");
  routes.delete("/:club_id");

  return routes;
};

export default clubRoutes;
