import * as berandaController from '../services/berandaService.js';

export const getTopFive = async (req, res) => {
    try {
        const list = await berandaController.getTopFive();

        res.status(200).json(list);
    } catch (err) {
        console.error('Error Fetching Menus', err);
        res.status(500).json({ message: 'Internal Server error' });
    }
}

export const getTopByCategory = async (req, res) => {
    try {
        const list = await berandaController.getTopByCategory();
        res.status(200).json(list);
    } catch (err) {
        console.error('Error Fetching Menus', err);
        res.status(500).json({ message: 'Internal Server error' });
    }
}

export const getTodayIncome = async (req, res) => {
    try {
        const income = await berandaController.getTodayIncome();
        res.status(200).json(income);
    } catch (err) {
        console.error('Error Fetching Menus', err);
        res.status(500).json({ message: 'Internal Server error' });
    }
}