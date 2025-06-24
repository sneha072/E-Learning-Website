import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenSetCookie from "../utils/generateToken.js";

// Signup Controller
export const signUp = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, fullName });

    await newUser.save();
    generateTokenSetCookie(newUser._id, res); // ✅ Set cookie after saving

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signUp Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password || "");
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokenSetCookie(user._id, res); // ✅ Set cookie after validation

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error in login Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0,
    });

    res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    console.error("Error in Logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GetMe Controller
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getMe controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
