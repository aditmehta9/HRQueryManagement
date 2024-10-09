const request = require('supertest');
const app = require('./client/src/ResourceApp'); // Adjust the path as necessary
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27018/resourceDB', { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Resource API', () => {
    let resourceId;

    test('POST /api/resources - should create a new resource', async () => {
        const response = await request(app).post('/api/resources').send({ description: 'Test Resource' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('sequentialId');
        expect(response.body.description).toBe('Test Resource');
        resourceId = response.body.id; // Store the ID for later tests
    });

    test('GET /api/resources - should return all resources', async () => {
        const response = await request(app).get('/api/resources');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('PUT /api/resources/:id - should update an existing resource', async () => {
        const response = await request(app).put(`/api/resources/${resourceId}`).send({ description: 'Updated Resource' });
        expect(response.statusCode).toBe(200);
        expect(response.body.description).toBe('Updated Resource');
    });

    test('DELETE /api/resources/:id - should delete an existing resource', async () => {
        const response = await request(app).delete(`/api/resources/${resourceId}`);
        expect(response.statusCode).toBe(204);
    });
});
