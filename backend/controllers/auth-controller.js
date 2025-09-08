import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../libs/send-email.js";
import Verification from "../models/verification.js";
import aj from "../libs/arcjet.js";

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const decision = await aj.protect(req, { email }); // Deduct 5 tokens from the bucket
    console.log("Arcjet decision", decision.isDenied(), decision);

    if (decision.isDenied()) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "invalid email address" }));
    }

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

    const verificationToken = jwt.sign(
      { userId: newUser._id, purpose: "email-verification" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Here, you would typically send the verificationToken to the user's email.
    await Verification.create({
      userId: newUser._id,
      token: verificationToken,
      expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    console.log(`Verification link (send this via email): ${verificationLink}`);
    const emailBody = `Please verify your email by clicking on the following link: ${verificationLink}`;

    const emailSubject = "Email Verification";
    const isEmailSent = await sendEmail(email, emailSubject, emailBody);

    if (!isEmailSent) {
      return res.status(500).json({
        message: "Failed to send verification email. Please try again later.",
      });
    }

    res.status(201).json({
      message:
        "Verification email sent. Please check your inbox. Please verify your email to complete registration.",
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

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { userId, purpose } = payload;
    if (purpose !== "email-verification") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const verification = await Verification.findOne({
      userId,
      token,
    });

    if (!verification) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isTokenExpired = verification.expiresAt < new Date();
    if (isTokenExpired) {
      return res.status(401).json({ message: "Token expired" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.isEmailVerified) {
      res.status(400).json({ message: "Email already verified" });
    }

    user.isEmailVerified = true;
    await user.save();

    await Verification.findByIdAndDelete(verification._id);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export { registerUser, loginUser, verifyEmail };
