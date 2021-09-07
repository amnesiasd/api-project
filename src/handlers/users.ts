import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middleware/jwt_auth';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

const show = async (_req: Request, res: Response) => {
    const user = await store.show(_req.body.id);
    res.json(user);
};

const post = async (_req: Request, res: Response) => {
    const user: User = {
        first_name: _req.body.first_name,
        last_name: _req.body.last_name,
        password: _req.body.password
    }
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
};

const destroy = async (_req: Request, res: Response) => {
    try {
        const deleted = await store.deleteUser(_req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const user_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', verifyAuthToken, post);
    app.delete('/users/:id', verifyAuthToken, destroy);
};

export default user_routes;