const Restaurant = require("../models/restaurant.model");

module.exports.getAllRestaurants = async (req, res, next) => {
    try {
        const data = await Restaurant.find().populate("foodItem");
        return res.json({ data });
    } catch (err) {
        next(err);
    }
};

module.exports.getRestaurantById = async (req, res, next) => {
    try {
        const id = req.params.resId;
        const data = await Restaurant.find({ _id: id }).populate("foodItem");

        return res.json({ data });
    } catch (err) {
        next(err);
    }
};
