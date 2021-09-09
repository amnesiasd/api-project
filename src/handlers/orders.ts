import express, {Request, Response} from 'express';
import verifyAuthToken from '../middleware/jwt_auth';
import { Order, OrderDetails, OrderStatusStore, OrderStore, UserOrder } from '../models/order';
import { User } from '../models/user';

const store = new OrderStore();
const statusStore = new OrderStatusStore();

const index = async(_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const show = async (_req: Request, res: Response) => {
    const order = await store.show(_req.params.id);
    res.json(order);
};

const createOrderStatus = async (_req: Request, res: Response) => {
    const order = await statusStore.createOrderStatus(_req.body.status);
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
        const orders: UserOrder[] = await store.showUserOrders(_req.params.id);
        res.json(orders);
    } catch(err) {
        res.json(err);
    }
}

const createOrder = async (_req: Request, res: Response) => {
    try {
        const order: OrderDetails = {
            order_id: _req.body.order_id,
            prod_id: _req.body.prod_id,
            quantity: _req.body.quantity
        }
        const orders = await store.createUserOrder(order);
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
    app.get('/showUserOrders/:id',verifyAuthToken, showUserOrders);
    app.post('/addToOrder', createOrder)
    app.post('/createStatus', createOrderStatus)
};

export default order_routes;