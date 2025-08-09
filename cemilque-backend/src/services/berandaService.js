import { query } from "../db.js";

export const getTopFive = async() => {
  const { rows } = await query(
    `SELECT 
        m.menu_name, 
        d.quantity, 
        d.quantity * m.menu_price as omset
    FROM 
        dailysold_tb d
    JOIN 
        menu_tb m ON d.menu_id = m.menu_id
    ORDER BY d.quantity DESC
    LIMIT 5`
  );

  return rows;
};

export const getTopByCategory = async () => {
  const { rows } = await query(
    `SELECT 
        m.menu_category, 
        SUM(d.quantity) AS total_quantity
     FROM 
        dailysold_tb d
     JOIN 
        menu_tb m ON d.menu_id = m.menu_id
     GROUP BY 
        m.menu_category
     ORDER BY 
        total_quantity DESC
     LIMIT 7`
  );

  return rows;
};

export const getTodayIncome = async () => {
   const income = await query(
      `SELECT 
         SUM((m.menu_price - m.menu_hpp) * d.quantity) as total_profit
      FROM 
         dailysold_tb d
      JOIN 
         menu_tb m ON d.menu_id = m.menu_id;
      `
   )

   return income.rows;
}