import mongoose, { model, mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);
