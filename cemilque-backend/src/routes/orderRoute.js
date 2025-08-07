import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders/add-order', orderController.createOrderDetails);

router.put('/orders/:orderId/complete', orderController.putOrderDone);

router.get('/orders/show-all', orderController.getAllOrders);

router.delete('/orders/:orderId/delete', orderController.deleteOrder);

export default router;