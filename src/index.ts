import 'module-alias/register';
import dotenv from 'dotenv';

import app from './app';
import { establishConnectionToDatabase } from './mongo';

dotenv.config();

app.listen(3000, () => {
	console.log('Application listening on port 3000');

	try {
		establishConnectionToDatabase();
	} catch (e) {
		console.group('Connecting to database:');
		console.warn('Could not establish connection.');
		console.warn('Reason:', e.message);
		console.groupEnd();
	}
});
