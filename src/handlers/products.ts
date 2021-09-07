import express, {Request, Response} from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';

const store = new ProductStore();

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization || '';
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)

        next()
    } catch (error) {
        res.status(401)
    }
}

const index = async(_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

const show = async (_req: Request, res: Response) => {
    const user = await store.show(_req.params.id);
    res.json(user);
};

const post = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price    
    }
    const newProduct = await store.create(product);
    res.json(newProduct);
};

const destroy = async (req: Request, res: Response) => {
    try {
       const deleted = await store.deleteProduct(req.params.id);
        res.json(deleted);
    } catch (err) {
       res.status(400)
       res.json(err)
    }
}

const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, post);
    app.delete('/products/:id', verifyAuthToken, destroy);
};

export default product_routes;