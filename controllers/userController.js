import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";

const getUserController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    // validation
    if (!user) {
      res.status(404).send({ success: false, message: "User not found" });
    }
    // hide password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User data got successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "getUserController - Error", error });
  }
};
const updateUserController = async (req, res) => {
  try {
    const { address, phone } = req.body;
    if (!(address || phone)) {
      return res
        .status(500)
        .send({ success: false, message: "At least one field required" });
    }
    const user = await User.findById({ _id: req.body.id });
    // validation
    if (!user) {
      res.status(404).send({ success: false, message: "User not found" });
    }

    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).send({ success: true, message: "User details updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "updateUserController - Error", error });
  }
};
const updatePassController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(500)
        .send({ success: false, message: "Password is required" });
    }
    const user = await User.findById({ _id: req.body.id });
    // validation
    if (!user) {
      res.status(404).send({ success: false, message: "User not found" });
    }

    const isMatched = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatched) {
      res
        .status(500)
        .send({ success: false, message: "Current Password is incorrect" });
    }

    const saltRound = bcryptjs.genSaltSync(10);
    const hashedPass = await bcryptjs.hash(newPassword, saltRound);
    if (hashedPass) user.password = hashedPass;

    await user.save();

    res.status(200).send({ success: true, message: "Password updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "updateUserController - Error", error });
  }
};

export { getUserController, updateUserController, updatePassController };
