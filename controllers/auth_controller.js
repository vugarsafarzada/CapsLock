'use strict';
const DataBase = require('../models/model');
const Admins = require('../models/admins');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
dotenv.config({ path: './config/env/config.env' });


exports.login = async function (req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).render('admin_login', {
                message: 'Please providean email and password'
            })
        }
        Admins.find({ admin_username: username }, async function (err, results) {
            if (!results[0] || !(await bcrypt.compare(password, results[0].admin_password))) {
                res.status(401).render('admin_login', {
                    message: "Email or password is incorrect!"
                })
            } else {
                const user = results[0]
                const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect('/admin/panel');
            }
        })

    } catch (error) {
        res.render('admin_login')
        console.log(error);
    }
};

exports.register = function (req, res) {

    const { fullname, username, email, password, passwordAgain } = req.body;

    Admins.find({ admin_email: email }, async function (err, results) {
        if (err) throw err;
        if (results.length > 0) {
            return res.render('admin_register', {
                message: 'That email already used'
            });
        } else if (password !== passwordAgain) {
            return res.render('admin_register', {
                message: 'Password don\'t mach'
            });
        } else {
            let hashedPassword = await bcrypt.hash(password, 8);
            var registerAdmin = new Admins({
                admin_fullname: fullname,
                admin_password: hashedPassword,
                admin_email: email,
                admin_username: username
            });
            registerAdmin.save((err) => {
                if (err) throw err;
                console.log("Register new admin who", fullname)
            })
            res.redirect('/')
        }
    });
};