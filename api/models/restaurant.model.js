const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        name: { type: String, default: "", required: true },
        duration: { type: String, default: "", required: true },
        rate: { type: String, default: "", required: true },
        placeholder: { type: String, default: "", required: true },
        description: { type: String, default: "", required: true },
        foodItem: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "FoodItem",
            },
        ],
    },
    { collection: "restaurant" }
);
const model = mongoose.model("RestaurantSchema", RestaurantSchema);

module.exports = model;
