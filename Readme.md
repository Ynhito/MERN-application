Это мой первый опыт разработки приложения с написанием не только фронтенда, но и бэкенда. Так что я поступлю также, как поступил, когда изучал React и вообще фронтенд разработку. То-есть - буду записывать всё, чему учусь. И делать это в формате пособия или гайда. Максимально понятным и простым языком, чтобы это мог понять любой человек.



Использовать я буду стек MongoDB, Express, React, NodeJS. Как модно сейчас говорить - **MERN**.



Всё начинается в файле app.js, который лежит в корне проекта. Начинаем мы с бэкенда.

Импортируем всё необходимое.

```javascript
const express = require('express');
const CONFIG = require('config');
const mongoose = require('mongoose');
```

express - сервер.

config - файл в котором храниться порт нашего сервера, секретная фраза для jwt токена и uri для коннекта с бд. Импортируем мы не просто файл, а нечто, что находится в модуле config, который можно установить

```
npm i config
```

Для этого нужно в корне проекта создать папку config и внутри неё создать файл default.json, внутри которого же и буду храниться наши данные.

```json
{
    "port": 5000,
    "jwtSecret": "witcher one love",
    "mongoUrl": "mongodb+srv://dima:password@cluster0-p1tta.mongodb.net/test?retryWrites=true&w=majority"
}
```

mongoose - модуль для подключения к mongodb.

Первое что мы делаем это инициализируем результат выполнения express в переменную, чтобы можно было легко обращаться к методам этого модуля.

```javascript
const app = express();
```

Далее с помощью метода use мы настраиваем первый наш роует, или же можно сказать endpoint.

```javascript
app.use('/api/auth', require('./routes/auth.route'))
```

Первым параметром вы указываем дефолтный путь, а вторым - импортируемый модуль, внутри которого мы описали роут для авторизации и регистрации.

То есть мы говорим - эндпоинт аунтефикации будет начинаться с /api/auth, а уже дальше, в зависимости от того, какой запрос будет приходить на сервер. Для авторизации /api/auth/login. Для регистрации /api/auth/register.

Следующей строчкой мы достаём порт из нашего конфига, либо же, если его нет, делаем его равным 5000

```javascript
const PORT = CONFIG.get('port') || 5000;
```

Ну и самый важный шаг - запуск нашего сервера. 

Создаём асинхронную функцию start и внутри тела описываем логику с помощью try-catch

В теле try первым делом настраиваем коннект с базой данных. Первый параметр - uri, который находится у нас в конфиге. Второй - объект опций.

Делаем это await, т.е дожидаемся ответа

```javascript
await mongoose.connect(CONFIG.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
```

Как только мы дождались ответа, начинаем "слушать сервер", т.е следить за изменениями в файлах. Метод listen у app. Первый параметр - порт, второй callback, с помощью которого можно указать что сервер запушен сообщением в консоли.

```javascript
app.listen(PORT, () => console.log(`App has been started on ${PORT} port!`))
```

В теле catch, т.е в момент, если у нас произошла ошибка при коннекте к бд - выводим её в консоль и выходим из процессора с помощью глобальной переменной proccess и метода exit с единицей в параметре.

```javascript
catch(e) {
        console.log('Server Error!', e.message);
        process.exit(1);
    }
```

Что получилось в итоге...

```javascript
const express = require('express');
const CONFIG = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.route'))

const PORT = CONFIG.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(CONFIG.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        app.listen(PORT, () => console.log(`App has been started on ${PORT} port!`))
    }
    catch(e) {
        console.log('Server Error!', e.message);
        process.exit(1);
    }
}

start();

```

**Теперь давайте вернёмся к роутингу**

Внутри папки routes создаём файл auth.route.js.

В этом файле у нас будет описана логина роута для аутентификации пользователя.

Опять же, импортируем нужные модули

```javascript
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONFIG = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User')
```

Записываем результат выполнения Router в переменную router.

```javascript
const router = Router();
```

И начинаем

Говорим, "Хочу, когда фронт присылал мне post запрос по эндпоинту /api/auth/register, я делал какую-либо логику, сравнивал там логины, пароли и т.п и возвращал ему "Ок, ты вошёл..Ну или зарегистрировался успешно" либо же "Ошибка, неверные данные.""

Логику поняли? Ну так вот, давайте моё первое предложение разберём по словам, по порядку. "Шлёт post запрос"

```javascript
router.post()
```

 "Шлёт post запрос по эндпоинту /api/auth/register"

```javascript
router.post('/register')
```

"Шлёт post запрос по эндпоинту /api/auth/register, логика там...и я ему возращал"

```javascript
router.post(
    '/register',
    async (req, res) => {
        try {
            res.status(201).json({ message: 'Пользователь создан' })
        } catch(e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    }
)
```

Надеюсь все всё поняли) Первый параметр - название эндпоинта, второй - асинхронная функция с логикой, где параметры req(request) и res(response)

Если всё успешно то делаем status у response 200 или 201 в тело передаём объект с сообщением, что всё успешно. Не забыв указать что это json.

Если ошибка, то делаем тоже самое, только ошибку кидаем 500 и пишем текст ошибки.

**Регистрация**

Мы хотим создать нового пользователя. Давайте опишем модель этого пользователя, какие свойства и значения он может иметь.

Для этого создадим папку models и внутри User.js

Импорт

```javascript
const {Schema, model, Types} = require('mongoose');
```

Создаём схему пользователя, проще говоря интерфейс, если вы работали статически-типизированными яп. 

```javascript
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type: Types.ObjectId, ref: 'Link'}]
})
```

Говорим какого типа должно быть поле, обязательное или нет, уникальное или нет.

Также я здесь указал что у юзера будет массив с ссылками. Каждая ссылка - объект типа ObjectId.

Теперь мы это экспортируем

```javascript
module.exports = model('User', schema)
```

Опять же, чтобы вам было понятнее, это тоже самое, что написать...

```typescript
const User: schema = {}
module.exports = User;
```

Мы создали модель юзера, тип, или интерфейс для которого описали выше. И экспортируем её.

Импортируем её в файле с роутами для аутентификации.

**ЛОГИКА РЕГИСТРАЦИИ**

Первое, что мы хотим проверить при регистрации нового пользователя - не пришли ли данные, который до этого указал другой пользователь.

Мы достаём email и password из req.body

```javascript
const { email, password } = req.body;
```

И спрашиваем у бд, есть ли пользователь с таким же email. Дожидаемся ответ у метода findOne нашей созданной модели пользователя. Параметр - объект с полями, которые нужно проверить.

```javascript
const candidate = await User.findOne({ email });
```

Если такой кандидат находится, то возвращаем response с 400 ошибкой и текстом, что такой пользователь уже существует.

```javascript
if (candidate) {
    return res.status(400).json({ message: 'Такой пользователь уже существует!' 	})
}
```

Если же нет, то хэшируем пароль, с помощью модуля bcrypt, а именно метода у него hash. Первый параметр - пароль, пришедший с фронта, второй - степень хэширования. Чем больше - тем надёжнее.

```javascript
const hashedPassword = await bcrypt.hash(password, 12);
```

Делаем слепок получившего юзера, как экземпляр модели User

```javascript
const user = new User({
    email,
    password: hashedPassword
})
```

С помощью метода у получившего экземпляра save - сохраняем его в бд

```javascript
await user.save()
```

И отдаём фронту response о том, что пользователь успешно создан

```javascript
res.status(201).json({ message: 'Пользователь создан' })
```

Финальный результат регистрации...

```javascript
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      console.log('Body:', req.body)
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует!' })
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword
      })

      await user.save()

      res.status(201).json({ message: 'Пользователь создан' })


    }
    catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  })
```

Также хотелось мы отметить middleware для проверки пришедших с фронта данных на валидность. Делается это с помощью библиотеки express-validator. В наш router.post мы можем встраивать любое количество прослоек, между названием роутера и коллбеком с логикой. Делаем это с валидацией в виде массива, где каждый элемент - это проверка. Первый элемент check(). Первый параметр название поля, пришедшего с фронта. Второй текст ошибки, если таковая будет, третий метод на валидность. В нашем случае email должен быть корректен, то есть заканчиваться на @test.com или типа того. Значит применяем простой метод isEmail()

Для пароля логику вы думаю аналогично поняли.

```javascript
[
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
```

Внутри try создаём переменную errors, что является результатом validationResult(res) куда мы передаём запрос с фронта

```javascript
const errors = validationResult(req);
```

Ну и описываем ошибки

```javascript
if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }
```