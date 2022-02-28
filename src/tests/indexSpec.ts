import supertest from 'supertest';
import app from '../index';
import {promises as fsPromises} from 'fs';

const request = supertest(app);

describe('New image is created', () => {
    it('checks  new image',  () => {
        const fs = require('fs');
        const path = require('path');
        const filePath = "assets/thumb/palmtunnel.jpeg";
        const resolvedCreatedPath = path.resolve(filePath);
        if (fs.existsSync(resolvedCreatedPath)) {
             fsPromises.unlink(resolvedCreatedPath);
        }
        const response = request.get('/api/images?filename=palmtunnel&width=200&height=200').then(function(result) {
            expect(fs.existsSync(resolvedCreatedPath)).toBe(true)
        });
    }
)});


describe('Endpoint works', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api/images?filename=palmtunnel&width=1000&height=500');
        expect(response.status).toBe(200);
    }
)});


describe('Endpoint works', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api/images?filename=fjord&width=1000&height=500');
        expect(response.status).toBe(200);
    }
)});

