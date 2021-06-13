const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = new Schema({
    product_imageUrl: String,
    product_model: String,
    product_producer: String,
    product_price: String,
    product_description: String,
    product_category: String,
    creater_id: String,
    product_date: String
});

 
var Products = mongoose.model('Products', productsSchema);

module.exports = Products;