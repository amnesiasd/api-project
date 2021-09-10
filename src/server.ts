import express from 'express';
import user_routes from './handlers/users';
import product_routes from './handlers/products';
import order_routes from './handlers/orders';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.json());

user_routes(app);
product_routes(app);
order_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
});

export default app;
