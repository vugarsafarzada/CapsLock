const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const DataBase = require('../models/model');
const Admins = require('../models/admins');
const Products = require('../models/products');
dotenv.config({ path: './config/env/config.env' });

exports.adminPanel = function (req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            res.status(403).render('admin_login');
            res.clearCookie('jwt');
            res.clearCookie('username');
        } else {
            var userData = authData.user;
            Products.find({ creater_id: userData._id }, function (err, results) {
                if (err) throw err.message;
                let AllData = results.reverse();
                res.status(200).render('admin_panel', {
                    user: userData,
                    data: AllData
                })
            });
            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
                ),
                httpOnly: true
            };
            res.cookie('username', userData, cookieOptions);
            console.log('Login is succesfull')
        }
    });
};

exports.adminLogin = function (req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            res.status(403).render('admin_login');
            res.clearCookie('jwt');
            res.clearCookie('username');
        } else {
            res.redirect('/admin/panel')
            console.log('Login is succesfull')
        }
    });
};