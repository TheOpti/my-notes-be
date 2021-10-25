import express from 'express';
import useAuthentication from '../middleware/authentication';
import allowNoteOwnership from '../middleware/noteOwnership';

import login from './login';
import logout from './logout';
import register from './register';
import me from './me';
import { getAll, update, create, deleteById } from './notes';

const router = express.Router();

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/register').post(register);
router.route('/me').get(useAuthentication, me);

router.route('/notes').all(useAuthentication).get(getAll).post(create);
router.route('/notes/:id').all(useAuthentication, allowNoteOwnership).put(update).delete(deleteById);

export default router;
