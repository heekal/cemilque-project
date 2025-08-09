import * as storageController from "../services/storageService.js";

export const getAllNonFood = async(req, res) => {
    try {
        const items = await storageController.getAllNonFood();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data barang' });
    }
}

export const getAllFood = async(req, res) => {
    try {
        const items = await storageController.getAllFood();
        console.log(items);
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data barang' });
    }
}