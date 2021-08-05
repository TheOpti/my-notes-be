export const USER_TYPES = {
	USER: 'user',
	ADMIN: 'admin',
};

export const RESPONSE_MESSAGES = {
	// 200 - OK
	LOGIN_OK: 'Logged successfully',
	ACCOUNT_CREATED: 'Your account was created succesfully. You can now login.',
	LOG_OUT_OK: 'Succesfully logged out from the application.',

	// 400 - user errors
	USER_EXISTS: 'This login/email is already taken.',
	INCORRECT_DATA: 'Please check if all fields are filled correctly.',
	NO_USER_WITH_LOGIN: 'There is no user with given login',
	LOGIN_PASS_INCORRECT: 'Incorrect login or password',
	YOU_NEED_LOGIN: 'You need to Login',

	// 500 - server errors
	SERVER_ERROR: 'There was an error during request. Please, try again later.',
};
