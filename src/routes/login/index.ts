import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RESPONSE_MESSAGES } from '@constants';
import { encryptPassword } from '@utils/encrypt';
import { User, UserDocumentType } from '@models/user';

async function login(req: Request, res: Response) {
	const { login = '', password = '' } = req.body;

	if (!login || !password) {
		return res.status(400).send({ message: RESPONSE_MESSAGES.INCORRECT_DATA });
	}

	try {
		const user: UserDocumentType = await User.findOne({ login }, 'login password salt type').exec();

		if (!user) {
			return res.status(404).send({ message: RESPONSE_MESSAGES.NO_USER_WITH_LOGIN });
		}

		const { salt, password: storedPassword, type } = user;
		const passwordToCheck = encryptPassword(password, salt);

		if (passwordToCheck !== storedPassword) {
			return res.status(400).send({ message: RESPONSE_MESSAGES.LOGIN_PASS_INCORRECT });
		}

		const token = jwt.sign({ login, type }, 'RESTFULAPIs');
		return res
			.status(200)
			.cookie('token', token, {
				expires: new Date(Date.now() + 604800000),
				secure: false,
				httpOnly: true,
			})
			.send({ message: RESPONSE_MESSAGES.LOGIN_OK });
	} catch (error) {
		return res.status(500).send({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
}

export default login;
