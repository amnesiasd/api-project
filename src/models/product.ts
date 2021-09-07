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

    async show(id: String) :Promise<Product> {
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
    };

    async deleteProduct(id: String) : Promise<Number> {
        try {
            const conn = await Client.connect();
            let sql = `DELETE from products where id = ($1)`;
            let result = await conn.query(sql, [id]);
            sql = `SELECT COUNT(*) from products`;
            const newResult = await conn.query(sql);
            conn.release();
            return newResult.rowCount;
        } catch (err) {
            throw new Error(`Cannot delete product with id = ${id}. ${err}`);
        }
    }

    async delete() : Promise<Number> {
        try {
            const conn = await Client.connect();
            let sql = `DELETE from products`;
            let result = await conn.query(sql);
            sql = `SELECT COUNT(*) from products`;
            const newResult = await conn.query(sql);
            conn.release();
            return newResult.rowCount;
        } catch (err) {
            throw new Error(`Cannot delete products ${err}`);
        }
    }
}

