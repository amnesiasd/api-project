import Client from '../database';

export type Product = {
    id?: Number;
    name: string;
    price: Number;
}

export class ProductStore {
    async index() : Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }

    async show(id: Number) :Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM products WHERE id = ($1)`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find product with id=${id}: Error - ${err}.`);
        }
    }

    async create(product: Product) : Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`;
            const result = await conn.query(sql, [product.name, product.price]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Could not create product with name - ${product.name}: Error - ${err}`);
        }
    }
}

