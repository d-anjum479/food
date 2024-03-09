import { User } from "../models/userModel.js";

const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone } = req.body;
    // performing validation
    if (!userName || !email || !password || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }
    // Check Existing User
    const isUserExists = await User.findOne({ $or: [{ userName }, { email }] });
    if (isUserExists) {
      return res.status(500).send({
        success: false,
        message: "Username/Email must already exists",
      });
    }
    // Creating New User
    const newUser = await User.create({
      userName,
      email,
      password,
      address,
      phone,
    });

    res.status(201).send({
      success: true,
      message: "User registration successful",
      newUser,
    });
  } catch (error) {
    console.log(`registerController error: ${registerController}`);
    res.status(500).send({
      success: false,
      message: "Error in Register Controller",
      error,
    });
  }
};

export { registerController };
