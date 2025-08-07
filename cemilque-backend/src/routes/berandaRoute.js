import express from 'express';
import * as berandaController from '../controllers/berandaController.js';

const router = express.Router();

router.get('/beranda/get-top', berandaController.getTopFive);
router.get('/beranda/get-top-category', berandaController.getTopByCategory);

export default router;