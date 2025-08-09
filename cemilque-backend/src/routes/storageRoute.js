import express from 'express';
import * as storageController from '../controllers/storageController.js';

const router = express.Router();

router.get('/storage/get-items/NonMakanan', storageController.getAllNonFood);
router.get('/storage/get-items/Makanan', storageController.getAllFood);

export default router;