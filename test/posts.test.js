const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = require('../routes/posts');

require('dotenv').config();

const validToken = jwt.sign(
  { id: 1, username: 'tcit' },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN }
);

jest.mock('../controllers/controllerPost.js', () => ({
  getPosts: jest.fn((req, res) =>
    res.status(200).json({ success: true, message: 'getPosts ok' })
  ),
  getPost: jest.fn((req, res) =>
    res.status(200).json({ success: true, message: 'getPost ok' })
  ),
  createNewPost: jest.fn((req, res) =>
    res.status(201).json({ success: true, message: 'createNewPost ok' })
  ),
  updateExistingPost: jest.fn((req, res) =>
    res.status(200).json({ success: true, message: 'updateExistingPost ok' })
  ),
  deleteExistingPost: jest.fn((req, res) =>
    res.status(200).json({ success: true, message: 'deleteExistingPost ok' })
  ),
}));

const app = express();
app.use(express.json());
app.use('/posts', router);

describe('Rutas de Posts protegidas con JWT', () => {
  it('GET /posts debe llamar a getPosts', async () => {
    const res = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('getPosts ok');
  });

  it('GET /posts/:id debe llamar a getPost', async () => {
    const res = await request(app)
      .get('/posts/1')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('getPost ok');
  });

  it('POST /posts debe llamar a createNewPost', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ name: 'Nuevo Post', description: 'Descripción' });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('createNewPost ok');
  });

  it('PUT /posts/:id debe llamar a updateExistingPost', async () => {
    const res = await request(app)
      .put('/posts/1')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ name: 'Post Actualizado' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('updateExistingPost ok');
  });

  it('DELETE /posts/:id debe llamar a deleteExistingPost', async () => {
    const res = await request(app)
      .delete('/posts/1')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('deleteExistingPost ok');
  });

  it('debe devolver 401 si no se envía el token', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('No autorizado, token no proporcionado');
  });

  it('debe devolver 401 si el token es inválido', async () => {
    const res = await request(app)
      .get('/posts')
      .set('Authorization', 'Bearer token_invalido');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Token inválido o expirado');
  });
});
