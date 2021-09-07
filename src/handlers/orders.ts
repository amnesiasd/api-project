import express, {Request, Response} from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async(_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const show = async (_req: Request, res: Response) => {
    const order = await store.show(_req.params.id);
    res.json(order);
};

const post = async (req: Request, res: Response) => {
    const order: Order = {
        user_id: req.body.user_id,
        dbstatus: req.body.dbstatus
    }
    const newOrder = await store.create(order);
    res.json(newOrder);
};

const destroy = async (req: Request, res: Response) => {
    try {
       const deleted = await store.deleteOrder(req.body.id);
        res.json(deleted);
    } catch (err) {
       res.status(400)
       res.json(err)
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', post);
    app.delete('/orders/:id', destroy);
};

export default order_routes;