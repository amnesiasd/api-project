import Client from '../database';
import { Product, ProductStore } from './product';

export type Order = {
    id?: Number;
    user_id: Number;
    dbstatus: Number;
}

export type OrderStatus = {
    id: Number;
    dbstatus: string;
}

export type OrderDetails = {
    order_id: Number;
    prod_id: Number;
    quantity: Number;
}

export type UserOrder = {
    user_id: Number;
    order_id: Number;
    product: string;
    quantity: Number;
    status: String;
}

export class OrderStatusStore {
    async index() : Promise<OrderStatus[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM order_status`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get order status ${err}`);
        }
    }

    async createOrderStatus(desc: string) : Promise<OrderStatus> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO order_status(dbstatus) VALUES ($1) RETURNING *`;
            const result = await conn.query(sql, [desc]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create order status ${err}`);
        }
    }

    async delete() : Promise<Number> {
        try {
            const conn = await Client.connect();
            let sql = `DELETE from order_status`;
            let result = await conn.query(sql);
            sql = `SELECT COUNT(*) from order_status`;
            const newResult = await conn.query(sql);
            conn.release();
            return newResult.rowCount;
        } catch (err) {
            throw new Error(`Cannot delete order status ${err}`);
        }
    }
}

export class OrderStore {
    async index() : Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM orders`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    };

    async show(id: String) : Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM orders WHERE id = ($1)`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    };

    async showUserOrders(userId: string) : Promise<UserOrder[]> {
        try {
            const conn = await Client.connect();
            let sql = `SELECT o.user_id, o.id, p.name, op.quantity, os.dbstatus
            FROM users u   
            join orders o
            on o.user_id = u.id 
            join order_status os
            on os.id = o.dbstatus
            join order_products op
            on op.order_id = o.id
            join products p
            on p.id = op.prod_id       
            where u.id = ($1);`;
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`Cannot retrieve order for ${userId} - ${err}`);
        }
    }

    async create(order: Order) : Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO orders (user_id, dbstatus) VALUES ($1, $2) RETURNING *`;
            const result = await conn.query(sql, [order.user_id, order.dbstatus]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Could not create order for ${order.user_id}: Error - ${err}`);
        }
    }

    async createUserOrder(order: OrderDetails) : Promise<OrderDetails> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO order_products (order_id, prod_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
            const result = await conn.query(sql, [order.order_id, order.prod_id, order.quantity]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Could not create order for ${order.order_id}: Error - ${err}`);
        }
    }

    async deleteOrder(id: String) : Promise<Number> {
        try {
            const conn = await Client.connect();
            let sql = `DELETE from orders where id = ($1)`;
            let result = await conn.query(sql, [id]);
            sql = `SELECT COUNT(*) from orders`;
            const newResult = await conn.query(sql);
            conn.release();
            return newResult.rowCount;
        } catch (err) {
            throw new Error(`Cannot delete order with id=${id}. ${err}`);
        }
    }

    async delete() : Promise<Number> {
        try {
            const conn = await Client.connect();
            let sql = `DELETE from orders`;
            let result = await conn.query(sql);
            sql = `SELECT COUNT(*) from orders`;
            const newResult = await conn.query(sql);
            conn.release();
            return newResult.rowCount;
        } catch (err) {
            throw new Error(`Cannot delete orders ${err}`);
        }
    }
};