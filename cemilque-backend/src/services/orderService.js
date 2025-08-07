import { query } from "../db.js";
import { getMenuDetails } from "./menuService.js";

export const createOrder = async(orderData) => {
    const { tableNum, personName, isPaid} = orderData;
    
    const { rows } = await query(
        'INSERT INTO order_tb (tableNum, personName, isPaid, totalAmount) VALUES ($1, $2, $3, $4) RETURNING order_id',
        [tableNum, personName, isPaid, 0]
    )

    return rows[0];
}

export const createOrderDetails = async(orderData) => {
    const { tableNum, personName, dineIn, takeAway, isPaid } = orderData;
    const order = await createOrder({ tableNum, personName, isPaid });

    try {    
        const orderId = order.order_id;

        let totalAmount = 0;
        const allItems = [];

        if (dineIn && dineIn.length > 0) {
            for (const item of dineIn) {
                const menuResult = await getMenuDetails(item.menu_id);

                if (menuResult.length === 0) {
                    throw new Error(`Menu id with ${item.menu_id} not found`);
                }

                const menuPrice = menuResult[0].menu_price;
                const subtotal = menuPrice * item.quantity;
                totalAmount += subtotal;

                allItems.push({
                    order_id : orderId,
                    menu_id : item.menu_id,
                    quantity : item.quantity,
                    price : menuPrice,
                    order_type : 'dine_in'
                });
            }
        }

        if (takeAway && takeAway.length > 0) {
            for (const item of takeAway) {
                const menuResult = await getMenuDetails(item.menu_id);

                if (menuResult.length === 0) {
                    throw new Error(`Menu id with ${item.menu_id} not found`);
                }

                const menuPrice = menuResult[0].menu_price;
                const subtotal = menuPrice * item.quantity;
                totalAmount += subtotal;

                allItems.push({
                    order_id : orderId,
                    menu_id : item.menu_id,
                    quantity : item.quantity,
                    price : menuPrice,
                    order_type : 'take_away'
                });
            }
        }

        for (const item of allItems) {
            await query (
                'INSERT INTO orderdetails_tb (order_id, menu_id, quantity, price, order_type) VALUES ($1, $2, $3, $4, $5)',
                [item.order_id, item.menu_id, item.quantity, item.price, item.order_type]
            );
        }

        await query (
            'UPDATE order_tb SET totalAmount = $1 WHERE order_id = $2',
            [totalAmount, orderId]
        );

        return {
            orderId, totalAmount, itemCount: allItems.length, message: 'Pesanan Berhasil Dibuat'
        };

    } catch (error) {
        throw error;
    }
}

export const getAllOrders = async () => {
    const { rows } = await query(`
        SELECT * FROM order_tb o
        JOIN orderdetails_tb od ON o.order_id = od.order_id
        JOIN menu_tb m ON od.menu_id = m.menu_id
    `);

    const grouped = {};

    rows.forEach(row => {
        const id = row.order_id;

        if (!grouped[id]) {
            grouped[id] = {
                orderId: id,
                tableNum: row.tablenum,
                name: row.personname,
                dine_in: [],
                take_away: [],
                itemNum: 0,
                total: row.totalamount,
                payment: row.ispaid ? "LUNAS" : "BELUM LUNAS"
            };
        }

        const menuName = row.menu_name.replace(/\s+/g, "_").toLowerCase(); // e.g. "Pempek Komplit" → "pempek_komplit"
        const menuEntry = {
            [menuName]: [
                {
                    jumlah: row.quantity,
                    harga: row.price
                }
            ]
        };

        if (row.order_type === "dine_in") {
            grouped[id].dine_in.push(menuEntry);
        } else if (row.order_type === "take_away") {
            grouped[id].take_away.push(menuEntry);
        }

        grouped[id].itemNum += row.quantity;
    });

    return Object.values(grouped);
};

export const putOrderSold = async (items) => {
    try {
        for (const item of items) {
            const result = await query(
                'SELECT quantity FROM dailysold_tb WHERE menu_id = $1',
                [item.menu_id]
            );

            const existingQty = result.rows.length > 0 ? result.rows[0].quantity : 0;
            const newQty = existingQty + item.quantity;

            if (result.rows.length > 0) {
                // Update jika sudah ada
                await query(
                    'UPDATE dailysold_tb SET quantity = $1 WHERE menu_id = $2',
                    [newQty, item.menu_id]
                );
            } else {
                // Insert jika belum ada
                await query(
                    'INSERT INTO dailysold_tb (menu_id, quantity) VALUES ($1, $2)',
                    [item.menu_id, item.quantity]
                );
            }
        }

        return "Berhasil Ditambahkan";
    } catch (error) {
        throw error;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        await query('DELETE FROM order_tb WHERE order_id = $1', [orderId]);
    } catch (error) {
        throw error;
    }
};

export const putOrderDone = async (orderId) => {
    const result = await query(
        'SELECT menu_id, quantity FROM orderdetails_tb WHERE order_id = $1',
        [orderId]
    );

    const sold = result.rows;

    await putOrderSold(sold);  
    await deleteOrder(orderId);

    return { message: "Order selesai dan data penjualan ditambahkan", sold };
};