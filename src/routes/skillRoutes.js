import express from 'express'
import { createSkill, deleteSkill, getSkill, updateSkill } from '../controllers/skillController.js'
import multer from 'multer'

const upload = multer({ dest: '../uploads' })
const router = express.Router()


router.get('/', getSkill)
router.post('/', upload.single('logo'), createSkill)
router.put('/:id',upload.single('logo'), updateSkill)
router.delete('/:id', deleteSkill)

export default router