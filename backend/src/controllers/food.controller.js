import { foodpartenermodel } from "../models/foodpartener.model.js";

const createFood = async (req,res)=>{
 return res.status(200).json({message: "Food accessed"})
}


export {createFood}