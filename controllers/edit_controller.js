'use strict';
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const formidable = require('express-formidable');
const fs = require('fs');
const DataBase = require('../models/model');
const Products = require('../models/products');
const { getuid } = require('process');
dotenv.config({ path: './config/env/config.env' });

exports.select = function (req, res) {
    const getUrl = req.path.split('/')[1];
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            res.redirect('/admin/login');
            //res.sendStatus(403);
        } else {
            //res.json(authData.user.username);
            var userData = authData.user;

            Products.find({ _id: getUrl }, (err, results)=>{
                if (err) throw err.message;
                let AllData = results;

                res.status(200).render('edit_admin_panel', {
                    user: userData,
                    data: AllData
                })
            })
        }
    });
};

exports.edit = function (req, res) {
    let urlPic = req.files.img.path;
    let downTo = __dirname + '/../statics/images/';
    let imageName = req.files.img.name;
    const getUrl = req.params.id;
    console.log(getUrl)
    const { category, model, producer, description, price, money } = req.fields;

    if (imageName !== '' && category !== '' && model !== '' && producer !== '' && description !== '' && price !== '' && money !== '') {

        fs.readdir(downTo, function (err, files) {
            if (err) throw err;
            let imgs = []
            for (var file of files) {
                imgs.push(file)
            }
            let imageNameNew = `${imgs.length}${imageName}`;
            console.log(imageNameNew);
            let downToNew = downTo + imageNameNew
            fs.rename(urlPic, downToNew, function (error) {
                if (error) throw error;
                console.log("SUCCESSFULL FILE MOVED");

            });
            const imageUrl = `/images/${imageNameNew}`
            const priceProduct = `${price} ${money}`
            const creater = req.cookies.username.admin_fullname;
            console.log(creater + ' update a post')
            var d = new Date();
            var date = d.toLocaleDateString('az-AZ');
            const creater_ID = req.cookies.username._id;
            console.log(creater_ID)
            
            var addProduct = {
                product_imageUrl: imageUrl,
                product_model: model,
                product_producer: producer,
                product_price: priceProduct,
                product_description: description,
                product_category: category,
                creater_id: creater_ID,
                product_date: date,
                _id: getUrl
            };

            Products.updateOne({"_id": getUrl}, addProduct, (err)=>{
                if (err) throw err;
                console.log("New product editing successfully:", producer, model);
            })
            res.redirect('/'); 

        });
    } else if (imageName == '') {
        res.status(401).render('edit_admin_panel', {
            message: "Xanalar boş qala bilməz!"
        });
    };
};