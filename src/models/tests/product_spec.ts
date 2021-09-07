import { Product, ProductStore } from "../product";
import { User, UserStore } from "../user";

const prodStore = new ProductStore();

describe("Product Model", () => {
    beforeAll(function(){
        const newProd:Product = {
            name: "JumpRope",
            price: 21.99
        }
        prodStore.create(newProd);
    })
    it('should have an index method', () => {
        expect(prodStore.index).toBeDefined();
    });

    it('index method should return a list of products', async () => {
        const result = await prodStore.index();
        expect(result.length).toBeGreaterThan(0);
    })
})
