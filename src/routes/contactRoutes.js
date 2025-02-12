import express from 'express'
import { getContact, createContact } from '../controllers/contactController.js'

const router = express.Router()


router.get('/', getContact)
router.post('/' , createContact)

export default router
