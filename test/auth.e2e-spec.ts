import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './../src/auth/auth.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, HttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return an access token on successful login', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'admin123',
      })
      .expect(200);
    console.log(response.body);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.data).toHaveProperty('access_token');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response).toBeDefined();
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'invalid_user',
        password: 'wrong_pass',
      })
      .expect(401);

    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should return 400 if username or password is missing', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: '',
        password: '',
      })
      .expect(400);

    expect(response.body).toHaveProperty(
      'message',
      'Username and password are required',
    );
  });
});
