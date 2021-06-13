'use strict';
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const formidable = require('express-formidable');
const DataBase = require('../models/model');
const Products = require('../models/products')
const fs = require('fs');
dotenv.config({ path: './config/env/config.env' });

exports.posted = function (req, res) {
    let urlPic = req.files.img.path;
    let downTo = __dirname + '/../statics/images/';
    let imageName = req.files.img.name;

    const { category, model, producer, description, price, money } = req.fields;

    if (imageName !== '' && category !== '' && model !== '' && producer !== '' && description !== '' && price !== '' && money !== '') {
        fs.readdir(downTo, function (err, files) {
            if (err) throw err;
            let imgs = []
            for (var file of files) {
                imgs.push(file)
            }
            let imageNameNew = `${imgs.length}${imageName}`;
            let downToNew = downTo + imageNameNew
            fs.rename(urlPic, downToNew, function (error) {
                if (error) throw error;
                console.log("SUCCESSFULL FILE MOVED");

            });
            const imageUrl = `/images/${imageNameNew}`
            const priceProduct = `${price} ${money}`
            const creater_ID = req.cookies.username._id;
            var d = new Date();
            var date = d.toLocaleDateString('az-AZ');

            var addProduct = new Products({
                product_imageUrl: imageUrl,
                product_model: model,
                product_producer: producer,
                product_price: priceProduct,
                product_description: description,
                product_category: category,
                creater_id: creater_ID,
                product_date: date,
            });

            addProduct.save((err) => {
                if (err) throw err;
                console.log("New product adding successfully:", producer, model);
            });
            res.redirect('/');
        });
    } else if (imageName == '') {
        res.status(401).render('admin_panel', {
            message: "Xanalar boş qala bilməz!"
        });
    };


};