import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone, answer } = req.body;
    // performing validation
    if (!userName || !email || !password || !address || !phone || !answer) {
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
        message: "Username/Email already exists",
      });
    }
    // hashing password
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // Creating New User
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });

    res.status(201).send({
      success: true,
      message: "User registration successful",
      newUser,
    });
  } catch (error) {
    console.log(`registerController error: ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in Register Controller",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    // performing validation
    if (!password && (!userName || !email)) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }
    // Checking user in database
    const user = await User.findOne({ $or: [{ userName }, { email }] });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Username/Email does not exists",
      });
    }
    // comparing and decrypting password
    const isMatched = await bcryptjs.compare(password, user.password);
    if (!isMatched) {
      return res.status(500).send({
        success: false,
        message: "Invalid password",
      });
    }
    // generating token for login user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // if you don't want to send password field to the user
    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });

    console.log(
      `userName: ${userName} - email: ${email} - password: ${password}`
    );
  } catch (error) {
    console.log(`loginController error: ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in login Controller",
      error,
    });
  }
};

export { registerController, loginController };
