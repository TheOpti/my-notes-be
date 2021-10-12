import request from 'supertest';
import { RESPONSE_MESSAGES } from '@constants';
import app from '../../app';

describe('/logout endpoint', () => {
	it('should correctly clear cookie for logging out the user', async () => {
		const res = await request(app).post('/logout').set('Cookie', ['token=ExampleToken']).send({});

		expect(res.get('set-cookie')).toEqual(['token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly']);
		expect(res.get('cookie')).toEqual(undefined);
		expect(res.status).toEqual(200);
		expect(res.body.message).toEqual(RESPONSE_MESSAGES.LOG_OUT_OK);
	});
});
