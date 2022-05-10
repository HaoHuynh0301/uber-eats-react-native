const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        title: { type: String, default: "", required: true },
        price: { type: Number, default: "", required: true },
        placeholder: { type: String, default: "", required: true },
        description: { type: String, default: "", required: true },
    },
    { collection: "foodItem" }
);
const model = mongoose.model("FoodItemSchema", FoodItemSchema);

module.exports = model;
