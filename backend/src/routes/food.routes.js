import express from "express";
import { createFood } from "../controllers/food.controller.js";
import { authFoodPartenerMiddleware } from "../middleware/auth.middleware.js";
import multer, { memoryStorage } from "multer";


const upload = multer({ storage: memoryStorage() });

const foodRoute = express.Router();

//  Food POST API [PROTECTED]
foodRoute.post(
    "/",
    authFoodPartenerMiddleware,
    upload.single("video"),
    createFood
);

export default foodRoute;
