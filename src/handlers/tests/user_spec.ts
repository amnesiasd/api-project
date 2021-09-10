import { JwtPayload } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import supertest from 'supertest';
import { User } from '../../models/user';
import app from "../../server"

const req = supertest(app);

describe("User Handler", () => {
  let token: string = "";
  let newUserId: number;
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
    const deleted = await req.delete(`/users/${newUserId}`).set('Authorization', 'Bearer ' + token);
  });

  it('should return decoded data', () => {
    expect(decoded).toBeTruthy();
  });

  it('should return at least one user', async () => {
    const ret = await req.get('/users').set({'Authorization': 'Bearer ' + token});
    expect(ret.text).toBeTruthy();
  })

  it('should return user by id', async () => {
    try {
      const ret = await req.get(`/users/${newUserId}`).set({'Authorization': 'Bearer ' + token});
      expect(ret.text).toContain("Troy");
    } catch (err) {
    console.log(err);
    }
  });
})