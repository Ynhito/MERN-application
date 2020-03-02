const express = require('express');
const CONFIG = require('config');
const mongoose = require('mongoose');
const mysqllib = require('./@libs/mysql.lib');

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'testbd'
// });
// global.connection = connection;

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.route'));

app.use('/api/users', require('./routes/db.route'));

app.use('/api/gifts', require('./routes/gifts.route'));

app.get(
    '/favorite', (req, res) => {
        try {
            res.status(200).json('Hello world!')
        }
        catch(e) {
            res.status(500).json('Error!')
        }
    }
)



const PORT = CONFIG.get('port') || 5000;

async function start() {
    try {
        // connection.connect();
        // app.listen(PORT, () => console.log(`App has been started on ${PORT} port!`))
        mysqllib.connect().then(() => {
            console.log('Connected to mysql...')
            // var routes = require('./api/routes/routes'); //importing route
            // routes(app);
            app.listen(PORT, () => console.log(`App has been started on ${PORT} port!`))
          
          }).catch(e => {
            console.error('Error connecting mysql...')
            process.exit()
          })
    }
    catch(e) {
        console.log('Server Error!', e.message);
        process.exit(1);
    }
}

start();
