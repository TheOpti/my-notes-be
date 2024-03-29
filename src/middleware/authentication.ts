import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RESPONSE_MESSAGES } from '@constants';

function allowAuthentication(req: Request, res: Response, next: () => void) {
	const token = req.cookies.token || '';

	try {
		if (!token) {
			return res.status(401).send({ message: RESPONSE_MESSAGES.YOU_NEED_LOGIN });
		}

		const decrypt: any = jwt.verify(token, 'RESTFULAPIs');
		req.user = decrypt;

		next();
	} catch (_) {
		return res.status(500).send({
			message: RESPONSE_MESSAGES.SERVER_ERROR,
		});
	}
}

export default allowAuthentication;
