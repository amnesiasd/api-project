import { Order, OrderDetails, OrderStatus, OrderStore, OrderStatusStore } from "../order";
import { User, UserStore } from "../user";

const store = new OrderStore();

describe("Order Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index(1);
        expect(result).toEqual([]);
    });

    it('create method should return a successful order', async () => {
        const details = new OrderStatusStore();
        details.create("Active");
        details.create("Completed");
        const user = new UserStore();
        const user1: User = {
            first_name: "Troy",
            last_name: "H",
            password: "password123"
        };
        user.create(user1);
        const order: Order = {
            user_id: 1,
            status: 1
        };
        const result = await store.create(order);
        expect(result.id).toEqual(1);
    })
})
