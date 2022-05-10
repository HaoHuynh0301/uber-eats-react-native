const FoodItem = require("../models/FoodItem.model");

module.exports.getAllFoodItems = async (req, res, next) => {
    try {
        const data = await FoodItem.find();
        return res.json({ data });
    } catch (err) {
        next(err);
    }
};

module.exports.getFoodItemById = async (req, res, next) => {
    try {
        const id = req.params.itemId;
        const data = await FoodItem.find({ _id: id });

        return res.json({ data });
    } catch (err) {
        next(err);
    }
};
