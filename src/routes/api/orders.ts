import express from 'express';
import { Order, OrderStatusStore, OrderStore } from '../../models/order';
const orders = express.Router();

orders.get('/', (req, res) => {
    res.send('Orders route');
});

export default orders;