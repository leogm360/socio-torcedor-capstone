import { Router } from "express";

const routes = Router();

const userRoutes = () => {
  routes.post("/");
  routes.post("/login");
  routes.get("/");
  routes.get("/:user_id");
  routes.get("/me");
  routes.patch("/:user_id");
  routes.patch("/me");
  routes.delete("/:user_id");
  routes.delete("/me");

  return routes;
};

export default userRoutes;
