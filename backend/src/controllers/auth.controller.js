import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
        return res.status(400).json({
            message: "User already exist ",
        });
    }

    const saltedPassword = bcrypt.hash(password, 11);
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
};
