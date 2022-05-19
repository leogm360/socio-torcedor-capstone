import { Express } from "express";
import clubRoutes from "./club.routes";
import partnershipsRoutes from "./partnerships.routes";
import rewardsRoutes from "./rewards.routes";
import userRoutes from "./user.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes);
  app.use("/rewards", rewardsRoutes);
  app.use("/partnerships", partnershipsRoutes);
  app.use("/clubs", clubRoutes);
};

export default appRoutes;
