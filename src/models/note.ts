import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
	id: String,
	title: String,
	description: String,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	type: String,
	color: String,
	created: String,
	pinned: Boolean,
	deleted: Boolean,
	archived: Boolean,
});

const noteModel = mongoose.model('Note', noteSchema);

export { noteSchema, noteModel as Note };
