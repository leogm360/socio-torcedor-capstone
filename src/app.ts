import express from "express";
import "express-async-error";

import appRoutes from "./routes";

import { handleErrorMiddleware } from "./middlewares/handlers";

const app = express();

app.use(express.json());

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
