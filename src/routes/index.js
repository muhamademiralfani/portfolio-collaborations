import express from "express";
import projectRoutes from "./projectRoutes.js";
import heroRoutes from "./heroRoutes.js";
import educationRoutes from "./educationRoutes.js";

const router = express.Router();

router.use("/project", projectRoutes);
router.use("/hero", heroRoutes);
router.use("/education", educationRoutes)



export default router;
