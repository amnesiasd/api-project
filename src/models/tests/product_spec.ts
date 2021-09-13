import { Product, ProductStore } from "../product";
import { User, UserStore } from "../user";

const prodStore = new ProductStore();
let newProd: Product;
let newProdId: Number | undefined;

describe("Product Model", () => {
    beforeAll(function(){
        newProd  = {
            name: "JumpRope",
            price: 21.99
        }
        prodStore.create(newProd);
    });

    it('should create a product', async () => {
        newProd  = {
            name: "KettleBell",
            price: 39.99
        };
        const result = await prodStore.create(newProd);
        newProdId = result.id;
        expect(result.id).toBeGreaterThan(0);
    });

    it('should have an index method', () => {
        expect(prodStore.index).toBeDefined();
    });

    it('index method should return a list of products', async () => {
        const result = await prodStore.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('should return one product', async () => {
        const result = await prodStore.show(`${newProdId}`);
        expect(result).toBeTruthy();
    });

    it('should delete one product', async() => {
        const result = await prodStore.deleteProduct(`${newProdId}`);
        expect(result).toBeTruthy();
    });
})
