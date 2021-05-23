import config from 'config';
import dotenv from 'dotenv';
import envs from './constants/envs'; // переенные окружения
import env from './utils/env'; // Текущее окружение

dotenv.config(); // инициализируем библиотеку dotenv

// Проверка на несуществующее окружение
if (!envs[env]) {
	throw Error(`unknown env ${env}`)
}

// Сетим переменные в глобальное окружение ноды
// Дальше ноды эти перменные не выплывут
const PORT = process.env.PORT || config.get(`port`); // Порт берётся или из окружения или из наших настроек
const MONGO_URI = process.env.MONGO_URI || config.get(`mongo.uri`);

export {
  PORT,
  MONGO_URI,
};
