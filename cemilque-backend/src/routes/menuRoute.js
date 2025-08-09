import express from 'express';
import * as menuController from '../controllers/menuController.js';

const router = express.Router();

// Get all menus
router.get('/menus/get-all', menuController.getAllMenus);

// Get all menus grouped by category
router.get('/menus-category', menuController.getAllMenusByCategory);

// Get menu by ID/*
router.get('/menus/get/:id', menuController.getMenuById);
router.get('/menus/get-url/:url', menuController.getMenuByUrl);

// Create new menu
router.post('/menus/create', menuController.createMenu);

// Update menu by ID
router.put('/menus/update/:id', menuController.updateMenu);

// Delete menu by ID
router.delete('/menus/delete/:id', menuController.deleteMenu);

export default router;