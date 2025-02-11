import express from "express";
import projectRoutes from "./projectRoutes.js";
import heroRoutes from "./heroRoutes.js";

const router = express.Router();

router.use("/project", projectRoutes);
router.use("/hero", heroRoutes);

export default router;
