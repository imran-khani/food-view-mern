import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartener,
    loginPartener,
    logoutPartener,
} from "../controllers/auth.controller.js";

const router = express.Router();

// USER ROUTES
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);

// FOOD PARTNER ROUTES
router.post("/partener/register", registerFoodPartener);
router.post("/partener/login", loginPartener);
router.post("/paretener/logout", logoutPartener);

export default router;
