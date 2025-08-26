import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Please fill all the fields" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashpassword });
    await user.save();
    
    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role  
      }, 
      process.env.JWT_TOKEN, 
      { expiresIn: "30d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token: token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are required",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email.." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password.." });
    }

    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role  
      }, 
      process.env.JWT_TOKEN,
      { expiresIn: "30d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.log(error.message);
  }

  
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/", // Ensure path matches
    });

    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decoded.userId || decoded.id;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // Generate new token with extended expiration
    const newToken = jwt.sign(
      { 
        id: user._id,
        role: user.role  
      }, 
      process.env.JWT_TOKEN,
      { expiresIn: "30d" }
    );

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      token: newToken
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};


