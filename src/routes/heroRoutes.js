import express from "express";
import {
  getHero,
  updateHero,
  createHero,
} from "../controllers/heroControllers.js";

const router = express.Router();

router.get('/', getHero);
router.post('/', createHero);
router.put('/:id', updateHero);

export default router;
