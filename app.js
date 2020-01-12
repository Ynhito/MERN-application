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
        const server = app.listen(PORT, () => console.log(`App has been started on ${PORT} port!`))
        const io = require('socket.io')(server);
        io.on('connection', (socket) => {
            console.log('new use connected!')
            socket.username = "Anonymus";
            socket.on('change_username', (data) => {
                socket.username = data.username;
            })
            // socket.emit("FromAPI", `Your id is ${socket.username}`);
            socket.on('new_message', (data) => {
                io.sockets.emit('new_message', {message: data.message, username: socket.username})
            })
        })
    }
    catch(e) {
        console.log('Server Error!', e.message);
        process.exit(1);
    }
}

start();
