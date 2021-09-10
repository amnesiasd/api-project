import { JwtPayload } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import supertest from 'supertest';
import { resolveProjectReferencePath } from 'typescript';
import { Order, OrderDetails } from '../../models/order';
import { User } from '../../models/user';
import app from "../../server"

const req = supertest(app);

describe("Order Handler", () => {
  let token: string = "";
  let newUserId: number;
  let prodId: number;
  let orderStatusId: number;
  let orderId: number;
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
    prodId = await (await req.post('/products').send({name: "Whey Protein", price: 29.99}).set({'Authorization': 'Bearer ' + token})).body.id;
  });

  afterAll(async () => {
    await req.delete(`/users/${newUserId}`).set('Authorization', 'Bearer ' + token);
    await req.delete(`/products/${prodId}`).set('Authorization', 'Bearer ' + token);
    await req.delete(`/orders/${orderId}`).set('Authorization', 'Bearer ' + token);
  });

  it('should return decoded data', () => {
    expect(decoded).toBeTruthy();
  });

  it('should add a new order status', async () => {
    const ret = await req.post('/createStatus').send({status: "Approved"});
    orderStatusId = ret.body.id;
    expect(ret.statusCode).toBe(200);
  });

  it('should create new order for user', async () => {
    try {
      const order: Order = {
        user_id: newUserId,
        dbstatus: orderStatusId
      }
      const ret = await req.post(`/orders`).send(order);
      orderId = ret.body.id;
      expect(ret.body.id).toBeGreaterThan(0);
    } catch (err) {
        console.log(err);
    };
  });

  it('should return at least one order for user', async() => {
    try{
      const ret = await req.get(`/orders/${orderId}`);
      expect(ret.statusCode).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  it('should add product to order', async () => {
    const order: OrderDetails = {
      order_id: orderId,
      prod_id: prodId,
      quantity: 2
    };
    try {
      const ret = await req.post('/addToOrder').send(order);
      expect(ret.statusCode).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  it('should return at least one order for user', async() => {
    try {
      const ret = await req.get(`/showuserOrders/${newUserId}`).set('Authorization', 'Bearer ' + token);
      expect(ret.statusCode).toBe(200);
    } catch (err) {
      console.log(err);
    }
  })
})