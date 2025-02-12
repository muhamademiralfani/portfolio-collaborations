import express from "express";
import projectRoutes from "./projectRoutes.js";
import heroRoutes from "./heroRoutes.js";
import educationRoutes from "./educationRoutes.js";
import authRoutes from "./authRoutes.js"
import userRoutes from "./userRoutes.js"
import contactRouters from "./contactRoutes.js"
import skillRoutes from "./skillRoutes.js"

const router = express.Router();

router.use("/project",  projectRoutes);
router.use("/hero", heroRoutes);
router.use("/education", educationRoutes)
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/contact", contactRouters); 
router.use("/skill", skillRoutes)



export default router;
