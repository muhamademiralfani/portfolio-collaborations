import express from 'express'
import { registerController, loginController } from '../controllers/userController.js'
import multer from 'multer'

const upload = multer({ dest: '../uploads' })
const router = express.Router()




router.post('/register', upload.single('profilePicture'), registerController)
router.post('/login', loginController)


export default router