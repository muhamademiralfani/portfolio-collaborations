import express from "express";
import {
  createProject,
  getProjects,
  deleteProject,
  getProjectDetail,
  updateProject
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.delete("/:id", deleteProject);
router.get("/:id", getProjectDetail);
router.put("/:id", updateProject);

export default router;
