import { userModel } from "../models/user.model.js";
import { foodpartener } from "../models/foodpartener.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ===============================
// REGISTER USER
// ===============================
const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.jwtSecret);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    res.status(201).json({
        message: "User registered successfully.",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    });
};

// ===============================
// LOGIN USER
// ===============================
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.jwtSecret);
    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully.",
        user: {
            id: user._id,
            name: user.fullName,
            email: user.email,
        },
    });
};

// ===============================
// LOGOUT USER
// ===============================
const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully." });
};

// ===============================
// REGISTER FOOD PARTNER
// ===============================
const registerFoodPartener = async (req, res) => {
    const { name, email, password } = req.body;

    const existingPartner = await foodpartener.findOne({ email });
    if (existingPartner) {
        return res.status(400).json({ message: "Partner already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const partner = await foodpartener.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({ id: partner._id }, process.env.jwtSecret);

    res.cookie("token", token);

    res.status(201).json({
        message: "Partner registered successfully.",
        partner: {
            id: partner._id,
            name: partner.name,
            email: partner.email,
        },
    });
};

// ===============================
// LOGIN FOOD PARTNER
// ===============================

const loginPartener = async (req, res) => {
    const { email, password } = req.body;

    const partener = await foodpartener.findOne({ email });

    if (!partener) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, partener.password);

    if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: partener._id }, process.env.jwtSecret);

    res.cookie("token", token);
    res.status(200).json({
        message: "Partener logged in successfully",
        partener: {
            id: partener._id,
            name,
            email,
        },
    });
};

// ===============================
// LOGOUT FOOD PARTNER
// ===============================

const logoutPartener = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "user logout successfully." });
};

// Export all controllers
export {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartener,
    loginPartener,
    logoutPartener,
};
