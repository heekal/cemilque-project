import * as storageService from "../services/storageService.js";

export const getAllNonFood = async(req, res) => {
    try {
        const items = await storageService.getAllNonFood();
        res.json(items);
    } catch (err) {
        console.error('Error getting non-food items:', err);
        res.status(500).json({ error: 'Gagal mengambil data barang' });
    }
};

export const getAllFood = async(req, res) => {
    try {
        const items = await storageService.getAllFood();
        console.log(items);
        res.json(items);
    } catch (err) {
        console.error('Error getting food items:', err);
        res.status(500).json({ error: 'Gagal mengambil data barang' });
    }
};

// Add createItem controller
export const createItem = async(req, res) => {
    try {
        const itemData = req.body;
        
        // Validate required fields
        const { storage_name, storage_quantity, storage_date, storage_category, storage_cost } = itemData;
        
        if (!storage_name || !storage_quantity || !storage_date || !storage_category || !storage_cost) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        const newItem = await storageService.createItem(itemData);
        
        res.status(201).json({
            success: true,
            message: 'Item created successfully',
            data: newItem
        });
        
    } catch (err) {
        console.error('Error creating item:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const updateItemsData = async(req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        
        // Validate ID
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: 'Valid storage ID is required'
            });
        }
        
        // Validate data
        if (!data) {
            return res.status(400).json({
                success: false,
                message: 'Update data is required'
            });
        }
        
        const result = await storageService.updateItemsData(parseInt(id), data);
        
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Item updated successfully',
            data: result.rows[0]
        });
        
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const deleteItemsById = async(req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: 'Valid storage ID is required'
            });
        }
        
        const result = await storageService.deleteItemsById(parseInt(id));
        
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Item deleted successfully',
            data: result.rows[0]
        });
        
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server error' 
        });
    }
};