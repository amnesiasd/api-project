import Client from '../database';

export type Order = {
    id?: Number;
    user_id: Number;
    status: Number;
}

export type OrderStatus = {
    id: Number;
    desc: string;
}

export type OrderDetails = {
    order_id: Number;
    prod_id: Number;
    quantity: Number;
}

export class OrderStatusStore {
    async index() : Promise<OrderDetails[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM order_details`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get order details ${err}`);
        }
    }

    async create(desc: string) : Promise<OrderDetails> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO order_details(desc) VALUES ($1) RETURNING *`;
            const result = await conn.query(sql, [desc]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create order details ${err}`);
        }
    }
}

export class OrderStore {
    async index(user_id: Number) : Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM orders WHERE user_id = ($1)`;
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    };

    async create(order: Order) : Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`;
            const result = await conn.query(sql, [order.user_id, order.status]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Could not create order for ${order.user_id}: Error - ${err}`);
        }
    }
};