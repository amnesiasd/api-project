import express, {Request, Response} from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async(_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

const show = async (_req: Request, res: Response) => {
    const user = await store.show(_req.body.id);
    res.json(user);
};

const post = async (req: Request, res: Response) => {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    }
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser },process.env.TOKEN_SECRET as string);
    res.json(token);
};

const destroy = async (req: Request, res: Response) => {
    try {
       const deleted = await store.deleteUser(req.body.id);
        res.json(deleted);
    } catch (err) {
       res.status(400)
       res.json(err)
    }
}

const user_routes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', post);
    app.delete('/users/:id', destroy);
};

export default user_routes;