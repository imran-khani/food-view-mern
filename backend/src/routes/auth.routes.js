import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartener,
    loginFoodPartener,
} from "../controllers/auth.controller.js";

const router = express.Router();

// USER ROUTES
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);

// FOOD PARTNER ROUTES
router.post("/partner/register", registerFoodPartener);
router.post("/partner/login", loginFoodPartener);

export default router;
