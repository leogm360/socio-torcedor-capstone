import { Express } from "express";

import userRoutes from "./user.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes);
};

export default appRoutes;
