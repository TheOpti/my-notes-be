import request from 'supertest';
import { RESPONSE_MESSAGES } from '@constants';
import app from '../../app';

jest.mock('jsonwebtoken', () => ({
	...jest.requireActual('jsonwebtoken'),
	verify: (tokenValue: string) => {
		if (tokenValue === 'Incorrect') throw new Error();
		return { foo: 'bar' }
	},
}));

describe('/me endpoint', () => {
	it('should return 401 when no token is provided', async () => {
		const res = await request(app).get('/me').send({});

		expect(res.status).toEqual(401);
		expect(res.body).toEqual({ message: RESPONSE_MESSAGES.YOU_NEED_LOGIN });
	});

	it('should return 500 when token is incorrect', async () => {
		const res = await request(app).get('/me').set('Cookie', ['token=Incorrect']).send({});

		expect(res.status).toEqual(500);
		expect(res.body).toEqual({
			message: RESPONSE_MESSAGES.SERVER_ERROR,
		});
	});

	it('should correctly decode JWT and return data for the endpoint', async () => {
		const res = await request(app).get('/me').set('Cookie', ['token=Correct']).send({});

		expect(res.status).toEqual(200);
		expect(res.body).toEqual({ user: {
			foo: 'bar',
		}});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});
});
