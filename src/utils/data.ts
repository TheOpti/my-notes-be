import { USER_TYPES } from '../constants';
import { generateSalt, encryptPassword } from './encrypt';
import { User } from '../models/user';

function seedUserData(): void {
	const salt = generateSalt();
	const password = encryptPassword('test', salt);

	const user1 = {
		login: 'testuser',
		email: 'test@test.com',
		salt,
		password,
		type: USER_TYPES.USER,
	};

	const createdUser = new User(user1);
	createdUser.save((err) => {
		if (err) {
			console.log(`Error during saving: ${err}`);
		} else {
			console.log('Saved successfully');
		}
	});
}

function clearUserData(): void {
	User.collection.drop();
}

export { seedUserData, clearUserData };
