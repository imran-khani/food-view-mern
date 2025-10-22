import { foodpartenermodel } from "../models/foodpartener.model.js";
import jwt from "jsonwebtoken";

const authFoodPartenerMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access. Register or Login first",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        const foodpartener = await foodpartenermodel.findById(decoded.id);

        req.foodpartener = foodpartener;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export { authFoodPartenerMiddleware };
