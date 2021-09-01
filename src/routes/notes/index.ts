import { Request, Response } from 'express';

import { Note } from '@models/note';
import { User } from "@models/user";

import { RESPONSE_MESSAGES } from "@constants";

async function notes(req: Request, res: Response) {
	try {
		const { login } = req.user;
		const userId = await User.findOne({ login }, '_id').exec();
		const notes = await Note.find({ owner: userId }).exec();

		return res.send({ notes });
	} catch(error) {
		return res.status(500).send({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
}

export default notes;
