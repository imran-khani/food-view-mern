import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/auth.routes.js";
import foodRoute from "./routes/food.routes.js";

const app = express();
configDotenv();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);
app.use("/api/food", foodRoute);

export default app;
