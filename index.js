// $npm install -g nodemon
// nodemon globally installed 

const Koa = require('koa');
const app = new Koa();

// app.use (function) — эта функция - middleware, которое вызывается всякий раз, когда наш сервер получает запрос.

// app.use(async (ctx, next) => {
//    //do something before yielding to next generator function 
   
//    //in line which will be 1st event in downstream
//    console.log("1");
 
//    await next();

//    //do something when the execution returns upstream, 
//    //this will be last event in upstream
//    console.log("2");
// });

app.use(async (ctx) => {
    ctx.body = '<h1>Hello World</h1>'; // Устанавливаем  тело ответа сервера.
    ctx.set(`Access-Control-Allow-Origin`, `*`); // Устанеавливает заголовок
  });
  

// Эта функция связывает и прослушивает соединения на указанном порту. Функция обратного вызова выполняется, если приложение работает успешно.
app.listen(3000, function() {
    console.log('Server running on https://localhost:3000')
 });