'use strict';
const formidable = require('express-formidable');
const DataBase = require('../models/model');
const Products = require('../models/products');

exports.searchData = function (req, res) {
    var { searched } = req.body;
    if (searched.length > 0) {
        searched = searched.toLowerCase();
        
        Products.find({}, (err, results) => {
            if (err) throw err;
            var AllData = results.reverse();

            var i = 0;
            var didumean = [];
            for(i in AllData){
                var data = AllData[i];
                data.product_producer_model = `${data.product_producer} ${data.product_model}`;
                var DUM = data.product_producer_model
                didumean.push({ DUM });
            };

            var filterData_producer_model = AllData.filter(word => word.product_producer_model.toLowerCase().startsWith(searched));
            var filterData_model = AllData.filter(word => word.product_model.toLowerCase().startsWith(searched));
            var filterData_category = AllData.filter(word => word.product_category.toLowerCase().startsWith(searched));

            var AllFilterData = [
                ...filterData_producer_model,
                ...filterData_model,
                ...filterData_category
            ]

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

            if (AllFilterData.length > 0) {
                res.render('index', { data: AllFilterData, label: searched, didumean: didumean, producers });
            } else {
                res.render('index', { message: 'Məhsul tapılmadı', label: searched, didumean: didumean, producers });
            }

        });
    }else{
        res.redirect('/');
    }
};
