'use strict';
const express = require('express');
const deletepr = express.Router();
const deleteController = require('../controllers/delete_controller');

deletepr.get('/:_id', verifyToken, deleteController.deletepr)

function verifyToken(req, res, next) {
    const bearerHeader = req.cookies.jwt;
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        next();
    } else {
        res.redirect('/admin/login');
    }
}
module.exports = deletepr;