import { query } from "../db.js";

export const getAllNonFood = async() => {
    const result = await query(`SELECT * FROM storage_tb WHERE NOT storage_category = 'bahan_makanan'`);
    return result.rows;
};

export const getAllFood = async() => {
    const result = await query(`SELECT * FROM storage_tb WHERE storage_category = 'bahan_makanan'`);
    return result.rows;
}