import { Food } from "../models/foodModel.js";

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      foodCode,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    if (!title) {
      return res
        .status(500)
        .send({ success: false, message: "Title is required" });
    }
    const newFood = new Food({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      foodCode,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    await newFood.save();
    return res
      .status(201)
      .send({ success: true, message: "New food item created", newFood });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        { success: false, message: "Error createFoodController in API" },
        error
      );
  }
};
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await Food.find({});
    if (!foods) {
      return res
        .status(404)
        .send({ success: false, message: "Foods not available" });
    }
    return res
      .status(200)
      .send({ success: true, totalFoods: foods.length, foods });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in getAllFoodsController API" });
  }
};
const getSingleFoodController = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food not available" });
    }
    return res.status(200).send({ success: true, message: "Food found", food });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getSingleFoodController API",
    });
  }
};
const deleteFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(500)
        .send({ success: false, message: "Please provide id" });
    }
    const food = await Food.findById(id);
    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food not found" });
    }
    await Food.findByIdAndDelete(id);
    if (food) {
      return res
        .status(200)
        .send({ success: true, message: "Food deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleteFoodController API",
      error,
    });
  }
};
const updateFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(500)
        .send({ success: false, message: "Please provide id" });
    }
    const food = await Food.findById(id);
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "Food not found against the provided id",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      foodCode,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    const updateFood = await Food.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        foodCode,
        isAvailable,
        restaurant,
        rating,
        ratingCount,
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ success: true, message: "Food updated", updateFood });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updateFoodController API",
      error,
    });
  }
};

export {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  deleteFoodController,
  updateFoodController,
};
