import express from 'express';
import { User, UserStore } from '../../models/user';
const users = express.Router();

users.get('/', (req, res) => {
    res.send('Users route');
});

users.get('/:id', (req, res) => {
    res.send(`Users route for ${req.params.id}`);
})

export default users;