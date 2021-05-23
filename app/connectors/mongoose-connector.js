import mongoose from 'mongoose';

mongoose.Promise = Promise; // Укажем mongoose какой тип промисов использовать

// Функция, которая будет коннектить mongoose

export default (mongoUri) => {
	if (!mongoUri) {
		throw Error(`Mongo uri is undefined`)
	}

	return new Promise((res, rej) => {
		mongoose
			.connect(mongoUri, {
				useNewUrlParser: true, // все 4 настройки из доки, были ворнинги deprecated
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true
			})
			.then((mongodb) => {
				res(mongodb);
				console.log(`Mongo connected`);
			})
			.catch((err) => {
				rej(err);
			})
	})

}