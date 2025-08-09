import express from 'express';
import * as storageController from '../controllers/storageController.js';

const router = express.Router();

// GET routes
router.get('/storage/get-items/NonMakanan', storageController.getAllNonFood);
router.get('/storage/get-items/Makanan', storageController.getAllFood);

// POST route for creating new items
router.post('/storage', storageController.createItem);

// PUT route for updating items (with ID parameter)
router.put('/storage/update/:id', storageController.updateItemsData);

// DELETE route
router.delete('/storage/delete/:id', storageController.deleteItemsById);

export default router;