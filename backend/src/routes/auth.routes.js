import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartener,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.get("/user/login", loginUser);
router.get("/user/logout", logoutUser);
router.post("/partener/register", registerFoodPartener);
router.post("/partener/login", loginPartener);

export default router;
