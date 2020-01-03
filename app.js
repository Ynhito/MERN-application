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
