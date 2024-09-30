import api from '../services/api';
import MockAdapter from 'axios-mock-adapter';

describe('API Service', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(api);
    });

    afterEach(() => {
        mock.restore();
    });

    test('should handle request error', async () => {
        mock.onGet('/users').reply(500);

        await expect(api.get('/users')).rejects.toThrow('Request failed with status code 500');
    });

    test('should not add Authorization header if no token exists', async () => {
        localStorage.removeItem('token');
        mock.onGet('/users').reply(200, {});

        const response = await api.get('/users');
        expect(response.config.headers.Authorization).toBeUndefined();
    });

    test('should add Authorization header if token exists', async () => {
        const token = 'test-token';
        localStorage.setItem('token', token);
        mock.onGet('/users').reply(200, {});

        const response = await api.get('/users');
        expect(response.config.headers.Authorization).toBe(`Bearer ${token}`);
    });

    test('should reject promise on request error', async () => {
        mock.onGet('/users').reply(500);

        await expect(api.get('/users')).rejects.toEqual(expect.objectContaining({
            response: expect.objectContaining({
                status: 500,
            }),
        }));
    });
});