'use strict';
const express = require('express');
const search = express.Router();
const searchController = require('../controllers/search_controller');

search.post('/', searchController.searchData);

module.exports = search;