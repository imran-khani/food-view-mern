import foodModel from "../models/food.model.js";
import { uploadToImageKit } from "../services/storage.service.js";

const createFood = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
        }

        const uploadResponse = await uploadToImageKit(
            req.file.buffer,
            req.file.video
        );

        const createNewFood = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: uploadResponse.url,
            foodPartener: req.user?._id,
        });

        res.status(201).json({
            message: "Food uploaded successfully!",
            data: createNewFood,
        });
    } catch (error) {
        console.error("Error creating food:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { createFood };
