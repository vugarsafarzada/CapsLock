'use strict';
const { compareSync } = require('bcryptjs');
const { info } = require('console');
const fs = require('fs');
const DataBase = require('../models/model');
const Products = require('../models/products');

exports.homePage = function (req, res) {
    const pagesList = req.pageslist;
    const pageSize = req.pagesize;
    const AllData = req.alldata;

    var i = 0;
    var didumean = [];
    for (i in AllData) {
        var data = AllData[i];
        var DUM = `${data.product_producer} ${data.product_model}`;
        didumean.push({ DUM });
    };

    var startData = 0;
    var endData = pageSize;
    var filterData = AllData.slice(startData, endData);

    Products.find({}, (err, results) => {
        if (err) throw err;
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
        res.render('index', { data: filterData, pages: pagesList, end: pagesList.length, didumean, producers });
    });

};

exports.pageCreater = function (req, res) {
    const pagesList = req.pageslist;
    const pageSize = req.pagesize;
    const urlId = req.urlid;
    const AllData = req.alldata;

    var i = 0;
    var didumean = [];
    for (i in AllData) {
        var data = AllData[i];
        var DUM = `${data.product_producer} ${data.product_model}`;
        didumean.push({ DUM });
    };


    var startData = (urlId - 1) * pageSize
    var endData = pageSize * urlId;
    var filterData = AllData.slice(startData, endData);

    Products.find({}, (err, results) => {
        if (err) throw err;
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
        res.render('index', { data: filterData, pages: pagesList, end: pagesList.length, didumean, producers });
    });

};

exports.infoPage = function (req, res) {
    var info1 = fs.readFileSync('./statics/texts/biz_kimik.md', 'utf-8');
    var info2 = fs.readFileSync('./statics/texts/məhsullarımız_və_xidmətlərmiz.md', 'utf-8');
    var info3 = fs.readFileSync('./statics/texts/ünvan.md', 'utf-8');
    Products.find({}, (err, results) => {
        if (err) throw err;
        let AllData = results;
        var x = 0;
        var didumean = [];
        for (x in AllData) {
            var data = AllData[x];
            var DUM = `${data.product_producer} ${data.product_model}`;
            didumean.push({ DUM });
        };
        res.render('info', { info1, info2, info3, didumean });
    });
};

exports.findCategory = function (req, res) {
    var category = req.path.split('/')[1];
    Products.find({ product_category: category }, (err, results) => {
        if (err) throw err;
        let findData = results.reverse();

        Products.find({}, (err, results) => {
            if (err) throw err;
            let AllData = results;
            var x = 0;
            var didumean = [];
            for (x in AllData) {
                var data = AllData[x];
                var DUM = `${data.product_producer} ${data.product_model}`;
                didumean.push({ DUM });
            };

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

            if (findData[0] == undefined) {
                res.render('index', { message: 'Məhsul tapılmadı', label: category, didumean, producers });
            } else {
                res.render('index', { data: findData, label: category, didumean, producers });
            }

        });
    });
};

exports.findProduct = function (req, res) {
    var producer = req.path.split('/')[1];
    var label = producer;
    Products.find({ product_producer: producer }, (err, results) => {
        if (err) throw err;
        let findData = results.reverse();

        Products.find({}, (err, results) => {
            if (err) throw err;
            let AllData = results;
            var x = 0;
            var didumean = [];
            for (x in AllData) {
                var data = AllData[x];
                var DUM = `${data.product_producer} ${data.product_model}`;
                didumean.push({ DUM });
            };

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

            if (findData[0] == undefined) {
                res.render('index', { message: 'Məhsul tapılmadı', label, didumean, producers });
            } else {
                res.render('index', { data: findData, label, didumean, producers });
            }
        });
    });

};