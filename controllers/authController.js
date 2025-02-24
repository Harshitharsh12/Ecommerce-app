import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer, role } = req.body;
    // validations:
    if (!name || !email || !password || !phone || !address || !answer) {
      res.send({ message: "Each field is required!!" });
    }

    //Check user:
    const existingUser = await userModel.findOne({ email });
    //Existing user:
    if (existingUser) {
      return res.status(200).send({
        success: false,
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
      answer,
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
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
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
          answer: user.answer,
          role: user.role,
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
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required!!" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required!!" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required!!" });
    }
    const user = await userModel.findOne({ email, answer });

    // validation:
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong email or answer!!",
      });
    }
    const hash = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user.id, { password: hash });
    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!!",
      error,
    });
  }
};
