import { Request, Response } from 'express';
import { encryptPassword, generateSalt } from 'src/utils/encrypt';
import { USER_TYPES, RESPONSE_MESSAGES } from 'src/constants';
import { User } from 'src/models/user';

async function register(req: Request, res: Response) {
  const { login, email, password, repeatedPassword } = req.body;

  const passwordOk = password && repeatedPassword && password === repeatedPassword
  const credentialsCorrect = login && email && passwordOk;

  if (!credentialsCorrect) {
    return res
      .status(400)
      .send({ message: RESPONSE_MESSAGES.INCORRECT_DATA });
  }

  try {
    const user = await User.findOne({ $or: [{ login }, { email }] }, 'login').exec();

    if (user) {
      return res
        .status(409)
        .send({ message: RESPONSE_MESSAGES.USER_EXISTS });
    }

    const salt = generateSalt();
    const encryptedPassword = encryptPassword(password, salt);

    const newUser = {
      login,
      password: encryptedPassword,
      salt,
      email,
      type: USER_TYPES.USER,
    };

    const createdUser = User.create(newUser);
    if (!createdUser) {
      return res
        .status(409)
        .send({ message: RESPONSE_MESSAGES.USER_EXISTS });
    }

    return res
      .status(200)
      .send({ message: RESPONSE_MESSAGES.ACCOUNT_CREATED });
  } catch (error) {
    return res
      .status(500)
      .send({ message: RESPONSE_MESSAGES.SERVER_ERROR });
  }
}

export default register;
