'use strict';
const express = require('express');
const edit = express.Router();
const editController = require('../controllers/edit_controller');
const formidable = require('express-formidable');
edit.use(formidable());

edit.get('/:_id', verifyToken, editController.select)
edit.post('/:_id', editController.edit)

function verifyToken(req, res, next) {
    const bearerHeader = req.cookies.jwt;
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        next();
    } else {
        res.redirect('/admin/login');
    }
}
module.exports = edit;