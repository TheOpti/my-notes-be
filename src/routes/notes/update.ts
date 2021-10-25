import { Request, Response } from 'express';
import { RESPONSE_MESSAGES } from '@constants';

async function update(req: Request, res: Response) {
	try {
		return res.send();
	} catch (error) {
		return res.status(500).send({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
}

export default update;
