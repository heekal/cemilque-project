import { query } from "../db.js";
import { deleteOrder } from "./orderService.js";

export const getMenus = async () => {
  const result = await query('SELECT * FROM menu_tb');
  return result.rows;
};

export const getAllMenusByCategory = async () => {
    const { rows } = await query('SELECT * FROM menu_tb');

    const grouped = {};

    rows.forEach(row => {
        const kategori = row.menu_category;

        if (!grouped[kategori]) {
            grouped[kategori] = {
                kategori,
                menu: []
            };
        }

        grouped[kategori].menu.push({
            id: row.menu_id,
            nama: row.menu_name,
            harga: row.menu_price,
            url: row.menu_url
        });
    });

    // Convert to array and sort: "Menu Baru" comes first
    const result = Object.values(grouped).sort((a, b) => {
        if (a.kategori === 'Menu Baru') return -1;
        if (b.kategori === 'Menu Baru') return 1;
        return 0; // no sorting on other categories
    });
    return result;
}

export const getMenuDetails = async(menuId) => {
    const { rows } = await query(
        'SELECT * FROM menu_tb WHERE menu_id = $1',
        [menuId]
    );

    return rows;
}

export const getMenuById = async (id) => {
  const result = await query('SELECT * FROM menu_tb WHERE menu_id = $1', [id]);
  return result.rows[0];
};

export const getMenuByUrl = async (url) => {
  const result = await query('SELECT menu_url FROM menu_tb WHERE menu_id = $1', [url]);
  return result.rows[0];
};

export const createMenu = async ({ menu_name, menu_price, menu_category, menu_url, menu_hpp }) => {
  const result = await query(
    `INSERT INTO menu_tb (menu_name, menu_price, menu_category, menu_url, menu_hpp)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [menu_name, menu_price, menu_category, menu_url, menu_hpp]
  );
  return result.rows[0];
};

export const updateMenu = async (id, { menu_name, menu_price, menu_category, menu_url, menu_hpp }) => {
  const result = await query(
    `UPDATE menu_tb
     SET menu_name = $1,
         menu_price = $2,
         menu_category = $3,
         menu_url = $4,
         menu_hpp = $5
     WHERE menu_id = $6
     RETURNING *`,
    [menu_name, menu_price, menu_category, menu_url, menu_hpp, id]
  );
  return result.rows[0];
};

export const deleteMenu = async (id) => {
  const result = await query('DELETE FROM menu_tb WHERE menu_id = $1 RETURNING *', [id]);
  
  return result.rows[0];
};