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
print('Created "users" collection.');

db.createCollection('notes');
print('Created "notes" collection.');

firstUserId = ObjectId();
secondUserId = ObjectId();

db.users.insert([
	{
		_id: firstUserId,
		login: 'testuser1',
		password: 'c89f5eda560cdc9e043261f00f6e8f1596200155fb752f8bd4d63f98c830941e',
		salt: 'cc64ff11',
		email: 'testuser1@email.com',
		type: 'user',
	},
	{
		_id: secondUserId,
		login: 'testuser2',
		password: 'c89f5eda560cdc9e043261f00f6e8f1596200155fb752f8bd4d63f98c830941e',
		salt: 'cc64ff11',
		email: 'testuser2@email.com',
		type: 'user',
	}
]);

print('Users added');

db.notes.insert([
	{
		title: 'My example note',
		description: 'This is description of a note',
		owner: firstUserId,
		type: 'note',
		color: 'orange',
		pinned: false,
		deleted: false,
		archived: false,
	},
	{
		title: 'Pinned note',
		description: 'This is note is pinned from start',
		owner: firstUserId,
		type: 'note',
		color: 'blue',
		pinned: true,
		deleted: false,
		archived: false,
	},
	{
		title: 'Another note',
		description: 'lorem ipsum dolor sit amet....',
		owner: firstUserId,
		type: 'note',
		color: 'yellow',
		pinned: false,
		deleted: false,
		archived: false,
	},
	{
		title: 'My example note',
		description: 'This is description of a note',
		owner: secondUserId,
		type: 'note',
		color: 'gray',
		pinned: false,
		deleted: false,
		archived: false,
	},
]);

