import { JwtPayload } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import supertest from 'supertest';
import { User } from '../../models/user';
import app from "../../server"

const req = supertest(app);

describe("Product Handler", () => {
  let token: string = "";
  let newUserId: number;
  let prodId: number;
  let decoded: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      password: string;
    }
  };
  beforeAll(async () => {
    const user: User = {
      first_name: "Troy",
      last_name: "Hayman",
      password: "password1234"
    };
    const response = await req.post('/users').send(user);
    token = response.body;
    decoded = jwt_decode<JwtPayload>(token) as {
      user: {
        id: number;
        first_name: string;
        last_name: string;
        password: string;
      }
    }
    newUserId = decoded.user.id;
  });

  afterAll(async () => {
    await req.delete(`/users/${newUserId}`).set('Authorization', 'Bearer ' + token);
    await req.delete(`/products/${prodId}`).set('Authorization', 'Bearer ' + token);
  });

  it('should return decoded data', () => {
    expect(decoded).toBeTruthy();
  });

  it('should add a new product', async () => {
    const ret = await req.post('/products').send({name: "Whey Protein", price: 29.99}).set({'Authorization': 'Bearer ' + token});
    prodId = ret.body.id;
    expect(ret.statusCode).toBe(200);
  });

  it('should return product by id', async () => {
    try {
      const ret = await req.get(`/products/${prodId}`).set({'Authorization': 'Bearer ' + token});
      expect(ret.text).toContain("Whey");
    } catch (err) {
    console.log(err);
    }
  });
})