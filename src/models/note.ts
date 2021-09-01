import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface NoteDocumentType extends Document {
	id: string,
	title: string,
	description: string,
	owner: {
		type: string,
		ref: 'User',
	},
	type: string,
	color: string,
	created: string,
	pinned: boolean,
	deleted: boolean,
	archived: boolean,
}

const noteSchema = new Schema<NoteDocumentType>({
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
