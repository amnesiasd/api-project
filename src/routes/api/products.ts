import express from 'express';
import { Product, ProductStore } from '../../models/product';
const products = express.Router();

products.get('/', (req, res) => {
    res.send('Products route');    
});

export default products;