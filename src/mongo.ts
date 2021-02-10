import mongoose from 'mongoose';

function establishConnectionToDatabase() {
	if (!process.env.DATABASE_URL) {
		throw new Error('Database URI not provided. Could not connect to database.');
	}

  mongoose.connect(process.env.DATABASE_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true
   });

  const db = mongoose.connection;

  db.on('error', (error) => `Error during connecting to DB: ${error}`);
  db.once('open', () => console.log('Connected to Mongo database'));
}

export {
  establishConnectionToDatabase,
}
