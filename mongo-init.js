print('Initalizing database.');

print('Adding user to database');
db.createUser({
	user: 'user',
	pwd: 'pass',
	roles: [
		{
			role: 'readWrite',
			db: 'my-notes'
		},
	],
});

db.createCollection('users');
print('Craeted "users" collection.');

db.users.insertOne(
	{
		login: 'testuser1',
		password: 'c89f5eda560cdc9e043261f00f6e8f1596200155fb752f8bd4d63f98c830941e',
		salt: 'cc64ff11',
		email: 'testuser1@email.com',
		type: 'user',
	}
);
db.users.insertOne(
	{
		login: 'testuser2',
		password: 'c89f5eda560cdc9e043261f00f6e8f1596200155fb752f8bd4d63f98c830941e',
		salt: 'cc64ff11',
		email: 'testuser2@email.com',
		type: 'user',
	}
);
print('Inserted some users');
