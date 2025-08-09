import * as orderService from "../services/orderService.js";

export const createOrderDetails = async(req, res) => {
    try {
        const orderData = req.body;
        console.log('Order Data:', orderData);
        const newOrder = await orderService.createOrderDetails(orderData);
        res.status(200).json(newOrder);
    } catch (err) {
        console.error('Error in Create Order Details', err);
        res.status(500).json({ message: 'Internal Server error' });
    }
};

export const getAllOrders = async(req, res) => {
    try{
        const orderDetailsData = await orderService.getAllOrders();
        res.status(200).json(orderDetailsData);
    } catch (err) {
        console.error('Error Fetching clients', err);
        res.status(500).json({ message: 'Internal Server error' });
    }
};

export const putOrderDone = async (req, res) => {
    try {
        const { orderId } = req.params;

        const ackd = await orderService.putOrderDone(orderId);
        res.status(200).json(ackd);
    } catch (err) {
        console.error('Error in synchronizing database', err);
        res.status(500).json({ message: 'Internal Server error' });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        console.log(orderId);
        const ackd = await orderService.deleteOrder(orderId);
        res.status(200).json(ackd);
    } catch (err) {
        console.error('Error in synchronizing database', err);
        res.status(500).json({ message: 'Internal Server error' });
    }
};
