import express from 'express';
import multer from 'multer';
import { registerUser, loginUser } from '../controllers/authController.js';
const router = express.Router();
const upload = multer();

router.post('/signup', upload.none(), registerUser);
router.post('/login', upload.none(), loginUser);

export default router;