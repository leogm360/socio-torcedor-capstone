import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";

import appRoutes from "./routes";

const app = express();

app.use(express.json());

appRoutes(app);

app.use(errorHandler);

export default app;
