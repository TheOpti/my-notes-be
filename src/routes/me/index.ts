import { Request, Response } from 'express';

function me(req: Request, res: Response) {
  return res
    .send({ user: req.user });
}

export default me;
