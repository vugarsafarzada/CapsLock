'use strict';
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const formidable = require('express-formidable');
const fs = require('fs');
const DataBase = require('../models/model');
const Products = require('../models/products')
dotenv.config({ path: './config/env/config.env' });

exports.deletepr = function (req, res){
    const getUrl = req.path.split('/')[1];
    Products.remove({_id: getUrl}, (err, result)=>{
        if(err) throw err;
        res.redirect('/admin/panel');
    })
}