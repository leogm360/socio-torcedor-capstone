import express from "express";
import appRoutes from "./routes";
import { handleErrorMiddleware } from "./middlewares";
import "express-async-errors";

const app = express();

app.use(express.json());

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
