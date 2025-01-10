import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Post Creation (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a post for an authenticated user', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpassword' }); // Adjust with valid credentials

    const { accessToken } = loginResponse.body;

    const response = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post.',
        authorId: 9, // This should match the logged-in user's ID
        authorName: 'testuser', // This should match the logged-in user's username
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.authorName).toBe('testuser');
  });

  it('should not allow post creation for unauthenticated users', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'Unauthorized Post',
        content: 'This post should not be created.',
      });

    expect(response.status).toBe(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
