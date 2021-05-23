import Koa from 'koa';
import connectorsInit from './connectors/index';
import compose from 'koa-compose';


connectorsInit();

const app = new Koa(); // Экземпляр приложения


async function random(ctx, next) {
  if ('/random' == ctx.path) {
    ctx.body = Math.floor(Math.random() * 10); // Вызывается и не вызывает никакие последующие middleware
  } else {
    await next();
  }
}

async function backwards(ctx, next) {
  if ('/backwards' == ctx.path) {
    ctx.body = 'sdrawkcab';
  } else {
    await next();
  }
}

async function pi(ctx, next) {
  if ('/pi' == ctx.path) {
    ctx.body = String(Math.PI);
  } else {
    await next();
  }
}

const all = compose([random, backwards, pi]);


// Headers
async function headers(ctx, next) {
  console.log(1);
  const start = Date.now();
  await next();
  console.log(5);
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  ctx.set(`Access-Control-Allow-Origin`, `*`);
}

// Timeout
async function timeout(ctx, next) {
  console.log(2);
  const timeout = await new Promise((res, rej) => setTimeout(()=> res(`resolved in 1s`), 2000));
  await next();

  console.log(4);
  ctx.body += timeout;
}

app.use(all);
app.use(headers);
app.use(timeout);

// Тестовый обработчик
app.use(async (ctx) => {
  console.log(3);
  console.log(ctx.path); // Выведет path в url, делается два запроса. 1 - "/", 2 - "/favicon.ico"
  ctx.body = '<h1>Hello World</h1>'; // Устанавливаем тело ответа сервера.
});

export default app;
