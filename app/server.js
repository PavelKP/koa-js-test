import app from './app';
import { PORT, MONGO_URI } from './config';

// Эта функция связывает и прослушивает соединения на указанном порту. Функция обратного вызова выполняется, если приложение работает успешно.
const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(MONGO_URI);

  console.log(`Server running on port: ${PORT}`);
});

export default server;

