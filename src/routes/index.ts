import express from 'express';
import users from './api/users';
import products from './api/products';
import orders from './api/orders'
import bodyParser from 'body-parser'
import cors from 'cors';
const routes = express.Router();
const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
};
 routes.use(cors(corsOptions));
 routes.use(bodyParser.json());


routes.get('/', (req, res, next) => {
    res.send('Main api route')
});

routes.use('/users', users);
routes.use('/products', products);
routes.use('/orders', orders);

export default routes;