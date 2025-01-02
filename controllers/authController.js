import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    // validations:
    if (!name || !email || !password || !phone || !address) {
      res.send({ Error: "Each field is required!!" });
    }

    //Check user:
    const existingUser = await userModel.findOne({ email });
    //Existing user:
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already registered please login!!",
      });
    }
    //register user:

    //hash the password:
    const hashedPassword = await hashPassword(password);

    //save user:
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully!!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation:
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Each fields are required!!",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password!!",
      });
    }
    const match = await comparePassword(password, user.password);
    if (match) {
      //token:
      const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "You logged in Successfully!!",
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        token,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or Password!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login!!",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("Protective Route!!");
};
