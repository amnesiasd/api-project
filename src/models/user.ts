import Client from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
    id?: Number;
    first_name: string;
    last_name: string;
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
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

    async show(id: Number): Promise<User> {
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

    async create(user: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *`;
            const hash = bcrypt.hashSync(user.password + pepper, Number(saltRounds));
            const result = await conn.query(sql, [user.first_name, user.last_name, hash]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create user with name - ${user.first_name} ${user.last_name}: Error - ${err}`);
        }
    }

    async deleteUser(id: string): Promise<Number> {
        try {
            const conn = await Client.connect();
            let sql = `DELETE from users where id = ($1)`;
            let result = await conn.query(sql, [id]);
            sql = `SELECT COUNT(*) from users`;
            const newResult = await conn.query(sql);
            conn.release();
            return newResult.rowCount;
        } catch (err) {
            throw new Error(`Cannot delete users ${err}`);
        }
    }

    async delete(): Promise<Number> {
        try {
            const conn = await Client.connect();
            let sql = `DELETE from users`;
            let result = await conn.query(sql);
            sql = `SELECT COUNT(*) from users`;
            const newResult = await conn.query(sql);
            conn.release();
            return newResult.rowCount;
        } catch (err) {
            throw new Error(`Cannot delete users ${err}`);
        }
    }
}

