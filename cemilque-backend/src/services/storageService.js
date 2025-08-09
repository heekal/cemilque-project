import { query } from "../db.js";

export const getAllNonFood = async() => {
    const result = await query(`SELECT * FROM storage_tb WHERE NOT storage_category = 'bahan_makanan'`);
    return result.rows;
};

export const getAllFood = async() => {
    const result = await query(`SELECT * FROM storage_tb WHERE storage_category = 'bahan_makanan'`);
    return result.rows;
};

// Add createItem function
export const createItem = async(itemData) => {
    const { storage_name, storage_quantity, storage_date, storage_category, storage_cost } = itemData;
    
    const result = await query(`
        INSERT INTO storage_tb (storage_name, storage_quantity, storage_date, storage_category, storage_cost)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `, [storage_name, storage_quantity, storage_date, storage_category, storage_cost]);
    
    return result.rows[0];
};

export const updateItemsData = async(id, newData) => {
    const { storage_name, storage_quantity, storage_date, storage_category, storage_cost } = newData;
    
    const result = await query(`
        UPDATE storage_tb 
        SET storage_name = $1, 
            storage_quantity = $2, 
            storage_date = $3, 
            storage_category = $4, 
            storage_cost = $5
        WHERE storage_id = $6
        RETURNING *
    `, [storage_name, storage_quantity, storage_date, storage_category, storage_cost, id]);
    
    return result;
};

export const deleteItemsById = async (Id) => {
    try {
        const result = await query('DELETE FROM storage_tb WHERE storage_id = $1 RETURNING *', [Id]);
        return result;
    } catch (error) {
        throw error;
    }
};