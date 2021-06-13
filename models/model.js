const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/env/config.env' });

const DataBase = mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('Connection is succesfull by Data Base'); 
});

module.exports = { DataBase }