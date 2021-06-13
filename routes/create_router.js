'use strict';
const express = require('express');
const server = express();
const create = express.Router();
const formidable = require('express-formidable');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const createController = require('../controllers/create_controller');

create.use(formidable());
create.use(express.static(__dirname + '/../statics/css'));
create.post('/post', createController.posted);

module.exports = create;