import express, {Request, Response} from 'express';
import { Order, OrderStore, UserOrders } from '../models/order';
import { User } from '../models/user';

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

const showUserOrders = async (_req: Request, res: Response) => {
    try {
        const orders: UserOrders[] = await store.showUserOrders(_req.params.id);
        res.json(orders);
    } catch(err) {
        res.json(err);
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', post);
    app.delete('/orders/:id', destroy);
    app.get('/showUserOrders/:id', showUserOrders);
};

export default order_routes;