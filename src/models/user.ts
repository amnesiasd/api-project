import Client from '../database';

export type User = {
    id: Number;
    first_name: string;
    last_name: string;
    password: string
}

export class ProductStore {
    async index() : Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }

    async show(id: Number) :Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM users WHERE id = ($1)`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find user with id=${id}: Error - ${err}.`);
        }
    }

    async create(user: User) : Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *`;
            const result = await conn.query(sql, [user.first_name, user.last_name, user.password]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error(`Could not create user with name - ${user.first_name} ${user.last_name}: Error - ${err}`);
        }
    }
}

