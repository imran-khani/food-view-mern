import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
        return res.status(400).json({
            message: "User already exist",
        });
    }

    const saltedPassword = await bcrypt.hash(password, 11);
    const user = await userModel.create({
        fullName,
        email,
        password: saltedPassword,
    });

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.jwtSecret
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    res.status(201).json({
        message: "User registered Successfully.",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        res.status(400).json({ message: "Invalid email or password" });
    }

    const isPassowrdValid = await bcrypt.compare(password, user.password);

    if (!isPassowrdValid) {
        res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.jwtSecret
    );
    res.cookie("token",token)
    res.status(200).json({
        message: "User logged in successfully.",
        user: {
            id:user._id,
            name: user.fullName,
            email: user.email
        }
    })
};

export { registerUser, loginUser };
