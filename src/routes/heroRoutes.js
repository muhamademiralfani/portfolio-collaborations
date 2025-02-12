import express from "express";
import multer from "multer";
import {
  getHero,
  updateHero,
  createHero,
} from "../controllers/heroControllers.js";

const upload = multer({ dest: "../uploads/" });
const router = express.Router();

router.get("/", getHero);
router.post("/", upload.single("image"), createHero);
router.put("/", upload.single("image"), updateHero);

export default router;
