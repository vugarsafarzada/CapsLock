'use strict';
const express = require('express');
const page = express.Router();
const pageController = require('../controllers/page_controller');
const DataBase = require('../models/model');
const Products = require('../models/products')

page.get('/', calculatePages, pageController.homePage);
page.get('/:id(\\d+)', calculatePages, pageController.pageCreater);

page.get('/info', pageController.infoPage);

page.get('/Noutbuk', pageController.findCategory);
page.get('/Monitor', pageController.findCategory);

page.get('/Acer', pageController.findProduct);
page.get('/Apple', pageController.findProduct);
page.get('/Asus', pageController.findProduct);
page.get('/Dell', pageController.findProduct);
page.get('/HP', pageController.findProduct);
page.get('/Huawei', pageController.findProduct);
page.get('/Lenovo', pageController.findProduct);
page.get('/MSI', pageController.findProduct);
page.get('/Samsung', pageController.findProduct);

//-----------------------------------------
function calculatePages(req, res, next) {
    let urlId = req.path.split('/')[1];
    const pageSize = 12;

    Products.find({}, (err, results) => {
        if (err) throw err;
        let AllData = results.reverse();
        let allPages = Math.ceil(AllData.length / pageSize);

        var calculateProducers = results.map(pr => {
            var AllProducers = pr.product_producer;
            return AllProducers;
        })

        var producers = [];
        var listOfProducers = [];

        var limit = 0;
        for (limit; limit < calculateProducers.length; limit++) {
            var producer = calculateProducers[limit];
            if (!producers.includes(producer)) {
                producers.push(producer);
            }
        }

        producers.forEach(element => {
            listOfProducers.push({ element });
        });

        producers.forEach(element => {
            var indexnum = producers.indexOf(element);
            var producer = element;
            var filtering = calculateProducers.filter(word => word == producer);
            var producerInfo = `${producer} (${filtering.length})`;
            producers[indexnum] = { producerInfo, producer };
        });

        if (urlId > allPages) {
            res.render('index', { message: 'Səhifə mövcud deyil' }, producers);
        } else {
            var i = 1;
            var pagesList = [];
            while (i <= allPages) {
                pagesList.push({ i });
                i++;
            };

            req.pageslist = pagesList;
            req.pagesize = pageSize;
            req.urlid = urlId;
            req.alldata = AllData;
            next();
        };
    })

};

module.exports = page;