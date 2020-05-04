const express = require('express');
const CONFIG = require('config');
const mongoose = require('mongoose');
const mysqllib = require('./@libs/mysql.lib');
// const saveFileS3Local = require('./@libs/file/saveFileS3Local')
const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.route'));

app.use('/api/electrocars', require('./routes/db.route'));

app.use('/api/gifts', require('./routes/gifts.route'));

app.use('/api/school', require('./routes/roboto_school.route'));

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
        mysqllib.connect().then(() => {
            console.log('Connected to mysql...')
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
