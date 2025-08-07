import * as menuService from '../services/menuService.js';

export const getAllMenus = async (req, res) => {
    try {
        const menus = await menuService.getMenus();
        res.json(menus);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data menu' });
    }
}

export const getAllMenusByCategory = async (req, res) => {
    try {
        const menus = await menuService.getAllMenusByCategory();
        res.status(200).json(menus);
    } catch (err) {
        console.error('Error Fetching menus', err);
        res.status(500).json({ message: 'Internal Server error' });
    }
};

export const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await menuService.getMenuById(id);
    if (!menu) return res.status(404).json({ error: 'Menu tidak ditemukan' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil menu' });
  }
};

export const createMenu = async (req, res) => {
  try {
    const { menu_name, menu_price, menu_category, menu_url, menu_hpp } = req.body;
    const newMenu = await menuService.createMenu({ menu_name, menu_price, menu_category, menu_url, menu_hpp });
    res.status(201).json(newMenu);
  } catch (err) {
    res.status(500).json({ error: 'Gagal membuat menu' });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { menu_name, menu_price, menu_category, menu_url, menu_hpp } = req.body;
    const updatedMenu = await menuService.updateMenu(id, { menu_name, menu_price, menu_category, menu_url, menu_hpp });
    if (!updatedMenu) return res.status(404).json({ error: 'Menu tidak ditemukan' });
    res.json(updatedMenu);
  } catch (err) {
    res.status(500).json({ error: 'Gagal memperbarui menu' });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenu = await menuService.deleteMenu(id);
    if (!deletedMenu) return res.status(404).json({ error: 'Menu tidak ditemukan' });
    res.json({ message: 'Menu berhasil dihapus', deletedMenu });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Gagal menghapus menu' });
  }
};