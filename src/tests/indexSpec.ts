import supertest from 'supertest';
import app from '../index';
import {promises as fsPromises} from 'fs';
import rescaler from '../utilities/imageScaleFunction';


const request = supertest(app);



describe('Test Image Scaling Middleware', () => {
    it('Test the scaling method', () => {
        const path = require('path');
        const filePath = "assets/full/palmtunnel.jpg";
        const filePath2 = "assets/thumb/palmtunnel.jpeg";
        expect(async () => {
            await rescaler(500, 500, filePath, filePath2);
        }).not.toThrow();
    }
)});

describe('Endpoint works', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api/images?filename=fjord&width=1000&height=500');
        expect(response.status).toBe(200);
    }
)});


describe('Endpoint 2 works', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api/images?filename=palmtunnel&width=1000&height=500');
        expect(response.status).toBe(200);
    }
)});



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




