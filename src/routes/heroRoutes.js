import express from "express";
import {
  getHero,
  updateHero,
  createHero,
} from "../controllers/heroControllers.js";
import { uploadSingle } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getHero);
router.post("/", uploadSingle, createHero);
router.put("/", uploadSingle, updateHero);

export default router;
