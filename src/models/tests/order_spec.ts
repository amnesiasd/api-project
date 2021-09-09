import { Order, OrderDetails, OrderStatus, OrderStore, OrderStatusStore, UserOrder } from "../order";
import { User, UserStore } from "../user";
import { Product, ProductStore } from "../product";

const store = new OrderStore();

describe("Order Model", () => {    
    beforeAll(function(){
        const userStore = new UserStore();
        const user: User = {
        first_name: 'Jude',
        last_name: 'H',
        password: 'password123'
        };
        userStore.create(user);
        const prodStore = new ProductStore();
        let newProd:Product = {
            name: "JumpRope",
            price: 21.99
        }
        prodStore.create(newProd);
        newProd = {
            name: "DumbBell",
            price: 37.95
        }
        prodStore.create(newProd);
        const status = new OrderStatusStore();
        const store = new OrderStore();
        status.createOrderStatus("Active");
        status.createOrderStatus("Completed");
        const order: Order = {
            user_id: 1,
            dbstatus: 1
        };
        store.create(order);
        let userOrder : OrderDetails = {
            order_id: 1,
            prod_id: 1,
            quantity: 2
        };
        store.createUserOrder(userOrder);
        userOrder = {
            order_id: 1,
            prod_id: 2,
            quantity: 1
        };
        store.createUserOrder(userOrder);
    })
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('create method should return a successful order', async () => {        
            const order: Order = {
            user_id: 1,
            dbstatus: 1
        };
        const result = await store.create(order);
        expect(result.id).toBeGreaterThan(0);
    });

    
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
})
