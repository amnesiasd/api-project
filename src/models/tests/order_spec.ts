import { Order, OrderDetails, OrderStatus, OrderStore, OrderStatusStore, UserOrder } from "../order";
import order_routes from "../../handlers/orders";
import { User, UserStore } from "../user";
import { Product, ProductStore } from "../product";
import jwt from 'jsonwebtoken';

const store = new OrderStore();
let authToken = '';
let newUser: User;
let orderStatus: OrderStatus;
let newOrder: Order;
let newProduct: Product;

describe("Order Model", () => {    
    beforeAll(async function(){
        const userStore = new UserStore();        
        const user: User = {
        first_name: 'Jude',
        last_name: 'H',
        password: 'password123'
        };
        newUser = await userStore.create(user);
        const prodStore = new ProductStore();
        
        const status = new OrderStatusStore();
        const store = new OrderStore();
        orderStatus =  await status.createOrderStatus("Active");
        status.createOrderStatus("Completed");
        const order: Order = {
            user_id: newUser.id as number,
            dbstatus: orderStatus.id
        };
        newOrder =  await store.create(order);
        let newProd:Product = {
            name: "JumpRope",
            price: 21.99
        }
        newProduct = await prodStore.create(newProd);
        let userOrder : OrderDetails = {
            order_id: newOrder.id as number,
            prod_id: newProduct.id as number,
            quantity: 2
        };
        store.createUserOrder(userOrder);
        newProd = {
            name: "DumbBell",
            price: 37.95
        }
        newProduct = await prodStore.create(newProd);        
        userOrder = {
            order_id: newOrder.id as number,
            prod_id: newProduct.id as number,
            quantity: 2
        };
        store.createUserOrder(userOrder);
    })
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('create method should return a successful order', async () => {        
            const order: Order = {
            user_id: newUser.id as number,
            dbstatus: orderStatus.id
        };
        const result = await store.create(order);
        expect(result.id).toBeGreaterThan(0);
    });

    
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
})
