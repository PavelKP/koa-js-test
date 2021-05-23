import Koa from 'koa';
import connectorsInit from './connectors/index';

connectorsInit();

const app = new Koa(); // Экземпляр приложения

// Тестовый обработчик
app.use(async (ctx) => {
  ctx.body = '<h1>Hello World</h1>'; // Устанавливаем  тело ответа сервера.
  ctx.set(`Access-Control-Allow-Origin`, `*`); // Устанеавливает заголовок
});

export default app;
