import { Request, Response } from 'express';
import { REPSONSE_MESSAGES } from 'src/constants';

async function logout(_: Request, res: Response) {
  res
    .clearCookie('token', {
      secure: false,
      httpOnly: true,
    })
    .send({
      message: REPSONSE_MESSAGES.LOG_OUT_OK
    });
}

export default logout;
