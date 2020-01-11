const express = require('express');
const CONFIG = require('config');
const mongoose = require('mongoose');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'testbd'
});
global.connection = connection;

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.route'))

app.use('/api/users', require('./routes/db.route'))



const PORT = CONFIG.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(CONFIG.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        connection.connect();
        // connection.query(`
        // INSERT INTO пользователи (Email, Пароль, Логин) VALUES
        // ('test@mail.ru', 'password123', 'Login2');
        // `, function(err, rows, fields) {
        //     if (err) throw err;
        //     console.log('The solution is: ', rows[1]);
        //   });
        // connection.query('DELETE FROM пользователи WHERE Логин = "Login2"', function(err, rows, fields) {
        //     if (err) throw err;
        //     console.log('The solution is: ', rows[0]);
        //   });
        // connection.query('SELECT * FROM `test`', function(err, rows, fields) {
        //     if (err) throw err;
        //     console.log('The solution is: ', rows[0]);
        //   });
        // connection.query('SELECT * FROM `Пользователи`', function(err, rows, fields) {
        //     if (err) throw err;
        //     console.log('The solution is: ', rows);
        //   });
        app.listen(PORT, () => console.log(`App has been started on ${PORT} port!`))
    }
    catch(e) {
        console.log('Server Error!', e.message);
        process.exit(1);
    }
}

start();
