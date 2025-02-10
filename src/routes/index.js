import express from 'express';
import { createProject } from '../controllers/projectController.js';

const router = express.Router();

router.post('/api/project', createProject);

export default router;
