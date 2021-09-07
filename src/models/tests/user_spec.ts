import { User, UserStore } from "../user";

const store = new UserStore();

describe("User Model", () => {
    beforeAll(function(){
        const store = new UserStore();
        const user: User = {
        first_name: 'Troy',
        last_name: 'H',
        password: 'password123'
    };
    store.create(user);
    })
    
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    })
})
