'use strict';
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const server = express();
const admin = express.Router();
const adminController = require('../controllers/admin_controller');

admin.use(express.static(__dirname + '/../statics/css'));
admin.get('/login', verifyToken, adminController.adminLogin);
admin.get('/register', function (req, res) {
    res.render('admin_register');
});
admin.get('/panel', verifyToken, adminController.adminPanel);
admin.get('/logout', function (req, res) {
    res.clearCookie('jwt');
    res.clearCookie('username');
    console.log('Cookies are cleared!');
    console.log('Logout successfull');
    res.redirect('/admin/login');
})

//Verify Token
function verifyToken(req, res, next) {
    const bearerHeader = req.cookies.jwt;
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        next();
    } else {
        res.render('admin_login');
    }
}

module.exports = admin;
