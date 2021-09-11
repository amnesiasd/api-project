import { User, UserStore } from "../user";

const store = new UserStore();
let user: User;
let user2: User;
let userId: Number | undefined;

describe("User Model", () => {
    beforeAll(function(){
        user = {
            first_name: 'Troy',
            last_name: 'H',
            password: 'password123'
        };
        user2 = {
            first_name: 'Jude',
            last_name: 'H',
            password: 'password1234'
        };
        store.create(user);
    })

    it('should create a new user',  async () => {
        const ret = await store.create(user2);
        userId = ret.id;
        expect(ret).toBeTruthy();
    })
    
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    })

    it('should return data for user', async () => {
        const result = await store.show(`${userId}`);
        expect(result.first_name).toContain('Jude');
    });

    it('should delete one user', async () => {
        const result = await store.deleteUser(`${userId}`);
        expect(result).toBeGreaterThan(0);
    });
})
