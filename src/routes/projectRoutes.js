import express from "express";
import {
  createProject,
  getProjects,
  deleteProject,
  getProjectDetail,
  updateProject
} from "../controllers/projectController.js";
import { uploadMultiple } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", uploadMultiple, createProject);
router.get("/", getProjects);
router.delete("/:id", deleteProject);
router.get("/:id", getProjectDetail);
router.put("/:id",uploadMultiple, updateProject);

export default router;
