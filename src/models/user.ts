import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface UserDocumentType extends Document {
	login: string,
	password: string,
	salt: string,
	email: string,
	type: string,
	notes: [{
		type: string,
		ref: 'Note',
	}],
}

const userSchema = new Schema<UserDocumentType>({
	login: {
		type: String,
		unique: true,
	},
	password: String,
	salt: String,
	email: {
		type: String,
		unique: true,
	},
	type: String,
	notes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Note',
		}
	]
});

const userModel = mongoose.model('User', userSchema);

export { userSchema, userModel as User };
