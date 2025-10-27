import { Schema, model } from "mongoose";


const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    video: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
    },
    foodPartener: {
        type: Schema.Types.ObjectId,
        ref: "foodpartener"
    }
},{timestamps:true})

const foodModel = model('food',foodSchema)

export default foodModel