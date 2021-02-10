import { Request, Response } from 'express';
import { RESPONSE_MESSAGES } from '@constants';

async function logout(_: Request, res: Response) {
	res
		.clearCookie('token', {
			secure: false,
			httpOnly: true,
		})
		.send({
			message: RESPONSE_MESSAGES.LOG_OUT_OK,
		});
}

export default logout;
