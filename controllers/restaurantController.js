import { Restaurant } from "../models/restaurantModel.js";

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      image,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logo,
      rating,
      ratingCount,
      code,
      coordinates,
    } = req.body;
    // validation
    if (!title || !coordinates) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and coordinates",
      });
    }
    // creating restaurant
    const newRestaurant = new Restaurant({
      title,
      image,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logo,
      rating,
      ratingCount,
      code,
      coordinates,
    });
    const restaurant = await newRestaurant.save();
    return res
      .status(201)
      .send({ success: true, message: "New restaurant added", restaurant });
  } catch (error) {
    console.log(error),
      res
        .status(500)
        .send({ success: false, message: "Error in restaurant api", error });
  }
};
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    if (!restaurants) {
      return res.status(500).send({
        success: false,
        message: "No restaurants found",
        error,
      });
    }

    return res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in getAllRestaurantController api",
        error,
      });
  }
};
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurant id",
        error,
      });
    }

    const restaurant = await Restaurant.findById({ _id: req.params.id });
    if (!restaurant) {
      return res.status(500).send({
        success: false,
        message: "No restaurant found",
        error,
      });
    }

    return res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in getRestaurantByIdController api",
        error,
      });
  }
};
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurant id",
        error,
      });
    }

    const restaurant = await Restaurant.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!restaurant) {
      return res.status(500).send({
        success: false,
        message: "No restaurant found",
        error,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in deleteRestaurantController api",
        error,
      });
  }
};

export {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
