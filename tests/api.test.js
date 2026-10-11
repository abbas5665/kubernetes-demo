import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Kubernetes Demo API', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('GET / returns the expected JSON response', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Hello from a container!');
        expect(response.body.service).toBe('hello-node');
        expect(response.body.pod).toBe('unknown');
        expect(Number.isNaN(Date.parse(response.body.time))).toBe(false);
    });

    it('GET / uses POD_NAME when configured', async () => {
        vi.stubEnv('POD_NAME', 'test-pod-123');

        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body.pod).toBe('test-pod-123');
    });

    it('GET /ready returns HTTP 200 and ready', async () => {
        const response = await request(app).get('/ready');

        expect(response.status).toBe(200);
        expect(response.text).toBe('ready');
    });

    it('GET /healthz returns HTTP 200 and ok', async () => {
        const response = await request(app).get('/healthz');

        expect(response.status).toBe(200);
        expect(response.text).toBe('ok');
    });

    it('returns HTTP 404 for an unknown endpoint', async () => {
        const response = await request(app).get('/does-not-exist');

        expect(response.status).toBe(404);
    });
});
