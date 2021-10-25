import request from 'supertest';
import { RESPONSE_MESSAGES } from '@constants';
import app from '../../app';
import { User } from '@models/user';
import { Note } from '@models/note';

jest.mock('jsonwebtoken', () => ({
	...jest.requireActual('jsonwebtoken'),
	verify: (tokenValue: string) => {
		if (tokenValue === 'Incorrect') throw new Error();
		return { foo: 'bar' };
	},
}));

describe('/notes endpoint', () => {
	it('should return 401 when no token is provided', async () => {
		const res = await request(app).get('/notes').send({});

		expect(res.status).toEqual(401);
		expect(res.body).toEqual({ message: RESPONSE_MESSAGES.YOU_NEED_LOGIN });
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should return 500 when there would be an error with database', async () => {
		jest.spyOn(User, 'findOne').mockImplementationOnce(
			() =>
				({
					exec: (): any => Promise.reject('Error'),
				} as any)
		);

		const res = await request(app).get('/notes').set('Cookie', ['token=Correct']).send({});

		expect(res.status).toEqual(500);
		expect(res.body).toEqual({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	});

	it('should correctly return list of notes for given user', async () => {
		jest.spyOn(User, 'findOne').mockImplementationOnce(
			() =>
				({
					exec: (): any => Promise.resolve('userId'),
				} as any)
		);

		jest.spyOn(Note, 'find').mockImplementationOnce(
			() =>
				({
					exec: (): any => Promise.resolve([]),
				} as any)
		);

		const res = await request(app).get('/notes').set('Cookie', ['token=Correct']).send({});

		expect(res.status).toEqual(200);
		expect(res.body).toEqual({ notes: [] });
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});
});
