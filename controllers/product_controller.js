const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const DataBase = require('../models/model');
const Products = require('../models/products')
dotenv.config({ path: './config/env/config.env' });


exports.product = function (req, res) {
    let urlId = req.path.split('/')[1];
    Products.find({ _id: urlId }, (err, results) => {
        try {
            if (err) throw err.message;
            let FindData = results;
            if (FindData[0]) {
                var picked = FindData.find(data => data._id == urlId);
                let getData = [];
                getData.push(picked);
                var text = getData[0].product_description.split('•');
                var i = 1;
                var description = [];
                while (i < text.length) {
                    var desc = text[i]
                    description.push({ desc });
                    i++;
                };

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
                    res.render('product', { data: getData, descriptions: description, didumean: didumean });
                });
            }
        } catch (error) {
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

                res.render('index', { message: 'Məhsul tapılmadı', didumean, producers });
            });
        }
    });
}


