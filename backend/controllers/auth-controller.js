import User from "../models/user.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists, please login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
    });

    // TODO: Send a welcome email to the user
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export { registerUser, loginUser };
