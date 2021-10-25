import { Request, Response } from 'express';

function allowNoteOwnership(req: Request, res: Response, next: () => void) {
	try {
		next();
	} catch (_) {
		return res.status(400);
	}
}

export default allowNoteOwnership;
