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
    res
      .status(201)
      .send({ success: true, message: "New restaurant added", restaurant });
  } catch (error) {
    console.log(error),
      res
        .status(500)
        .send({ success: false, message: "Error in restaurant api", error });
  }
};

export { createRestaurantController };
