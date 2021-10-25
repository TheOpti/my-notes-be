import request from 'supertest';
import { RESPONSE_MESSAGES } from '@constants';
import { User } from '@models/user';
import { encryptPassword } from '@utils/encrypt';
import app from '../../app';

describe('/login endpoint', () => {
	it('should return an error when no data is passed', async () => {
		const res = await request(app).post('/login').send({});

		expect(res.status).toEqual(400);
		expect(res.body).toEqual({ message: RESPONSE_MESSAGES.INCORRECT_DATA });
	});

	it('should return 404 when no user is found', async () => {
		jest.spyOn(User, 'findOne').mockImplementationOnce(
			() =>
				({
					exec: (): any => Promise.resolve(null),
				} as any)
		);

		const res = await request(app).post('/login').send({ login: 'non-existing', password: 'foo' });

		expect(res.status).toEqual(404);
		expect(res.body).toEqual({ message: RESPONSE_MESSAGES.NO_USER_WITH_LOGIN });
	});

	it('should return 500 when there would be an error with database', async () => {
		jest.spyOn(User, 'findOne').mockImplementationOnce(
			() =>
				({
					exec: (): any => Promise.reject('Error'),
				} as any)
		);

		const res = await request(app).post('/login').send({ login: 'doesntMatter', password: 'foo' });

		expect(res.status).toEqual(500);
		expect(res.body).toEqual({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	});

	it('should return 400 when credentials are not correct', async () => {
		jest.spyOn(User, 'findOne').mockImplementationOnce(
			() =>
				({
					exec: (): any =>
						Promise.resolve({
							user: 'user',
							password: 'pass',
							salt: 'salt',
						}),
				} as any)
		);

		const res = await request(app).post('/login').send({ login: 'user', password: 'otherPassword' });

		expect(res.status).toEqual(400);
		expect(res.body).toEqual({ message: RESPONSE_MESSAGES.LOGIN_PASS_INCORRECT });
	});

	it('should return 200 and correct token when user credentials are correct', async () => {
		const password = 'password';
		const salt = 'salt';

		const encryptedPassToStore = encryptPassword(password, salt);

		jest.spyOn(User, 'findOne').mockImplementationOnce(
			() =>
				({
					exec: (): any =>
						Promise.resolve({
							user: 'user',
							password: encryptedPassToStore,
							salt,
						}),
				} as any)
		);

		const res = await request(app).post('/login').send({ login: 'user', password });

		expect(res.status).toEqual(200);
		expect(res.body).toEqual({ message: RESPONSE_MESSAGES.LOGIN_OK });
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});
});
