'use strict';
const auth = require('./routes/auth_router');
const edit = require('./routes/edit_router');
const deletepr = require('./routes/delete_router');
const page = require('./routes/page_router');
const admin = require('./routes/admin_router');
const create = require('./routes/create_router');
const search = require('./routes/search_router');
const product = require('./routes/product_router');
const chromeLauncher = require('chrome-launcher');
const cookieParser = require('cookie-parser');
const model = require('./models/model');
const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const server = express();
dotenv.config({ path: './config/env/config.env' });

const hostname = process.env.DATABASE_HOST;
const port = process.env.PORT;

server.use(express.static(__dirname + '/statics'));
//Parse URL encoding badies (as sent by HTML forms)
server.use(express.urlencoded({ extended: true }));
//Parse JSON badies (as sent by API clients) 
server.use(express.json());
server.use(cookieParser());

server.set('view engine', 'hbs');

server.use('/', page);
server.use('/page', page);
server.use('/auth', auth);
server.use('/edit', edit);
server.use('/admin', admin);
server.use('/delete', deletepr);
server.use('/search', search);
server.use('/create', create);
server.use('/product', product);

server.listen(port, hostname, function() {
    console.log(`Server is runing on 'http://${hostname}:${port}'`);
});
