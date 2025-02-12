import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No Token Provided" });
  }

  try {
   
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded; 

   
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
