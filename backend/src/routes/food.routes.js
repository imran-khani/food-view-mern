import express from "express";
import { createFood } from "../controllers/food.controller.js";
import { authFoodPartenerMiddleware } from "../middleware/auth.middleware.js";
import multer, { memoryStorage } from "multer";

const foodRoute = express.Router();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
        cb(null, true);
    } else {
        cb(new Error("Only video files are allowed!"), false); // reject
    }
};
const upload = multer({ storage: memoryStorage(), fileFilter });

//  Food POST API [PROTECTED]
foodRoute.post(
    "/",
    authFoodPartenerMiddleware,
    upload.single("video"),
    createFood
);

export default foodRoute;
