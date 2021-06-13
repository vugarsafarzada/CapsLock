'use strict';
const express = require('express');
const product = express.Router();
const productController = require('../controllers/product_controller');

product.get('/:_id', productController.product);

module.exports = product;
