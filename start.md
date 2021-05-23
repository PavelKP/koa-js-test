Нам понадобиться:

1. $npm init
2. babel для поддержки es6+, пресеты и лпагины к нему
    $npm i babel-core babel-cli babel-preset-env babel-preset-stage-0 babel-plugin-transform-async-to-generator --save-dev
3. Создадим и настроим .babelrc
{
	"presets": ["env", "stage-0"],
	"plugins": ["transfor-async-to-generator"]
}
4. Протестируем babel
    Добавим скрипт в package.json - "start": "babel-node app/server",
    Добавим тестовый код в server.js
    const user = {name: 'test'}; const getName = () => { const {name} = user; return name; } console.log(`name ${getName()}`)
    babel соберёт код и выведет в консоль test
5. Поставим eslint и набор правил от google, babel preset для линтера (чтобы линтер понял наш es6 - ?)
    $npm i eslint eslint-config-google babel-eslint --save-dev
6. .eslintrc.json - создать и настроить
    Базовые настройки - остальное сам
    {
        "parser": "babel-eslint",
        "env": {
            "node": true,
            "es6": true
        },
        "parserOptions": {
            "sourceType": "module"
        },
        "extends": [
            "eslint:recommended",
            "google"
        ],
        "rules": {
            "no-console": 0,
            "max-len": 0,
            "object-curly-spacing": 0
        }
    }
7. Добавим скрипт "lint": "eslint app" - протестим 
8. Дробавим скрипт с автоматическим исправлением кода "lint:fix": "eslint --fix app"
9. Настоим nodemon - чтобы он при каждом изменении файла перезапускал его и линтил
    "nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected."

    $npm i nodemon --dev
    Ранее уже ставил глобально $npm install -g nodemon
10. Создадим ещё один скрипт, который запусит nodemon и eslin
    "dev": "nodemon --exec \"npm run lint && npm run start\""
11. Настроим server 
    $npm i koa --save
    Создадим файл app/app.js - тут будут подключаться основные файлы сервера

- передать порт через переменную окружения PORT=5555 npm run dev
    Сервер нужно запустить сразу же в этой строке, иначе не будет работать (?)

# Настройка окружения
1. установим библиотеку config $npm i config --save
    Позволит подключать файлы конфигурации в зависимости от окружения
2. создадим папку ./config
    default.json  - пропишем порт
    development.json - пропишем окружение для девелопмент
        поле env - название окружения, mongo - настройки для монго
    production.json - настройки для production
3. app/config.js - файл в котором будут собираться настройки для окружения

- Передать параметры через переменную окружения
    PORT=5555 MONGO_URI=mongouri npm run start

4. Создадим файл с константами окружения, чтобы в дальнейшем иметь возможность их проверки
Установим $npm i keymirror - позволяет создавать свойства объектов по его имени

5. Создадим app/constants/envs.js
    app\utils\env.js

    - $ NODE_ENV=test npm run start - проверка несуществуюшего окружения
    работает только development и production 

# Подключение mongoDB 

1. Скачаем библиотеку dotenv - чтоб указывать переменные окружения в файле, а не в терминале
    $npm i dotenv --save
    Создаём .env и указываем в нём переменные окружения

    .env надо добавить в gitignore (там будут храниться данные для подкючения)

    Создание базы mongoDB
    mlab.com - регаемся, прописываем uri в .env
    $npm i mongoose --save