const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AdminsSchema = new Schema({
    admin_fullname: String,
    admin_password: String,
    admin_email: String,
    admin_username: String
});

var Admins = mongoose.model("Admins", AdminsSchema);
module.exports = Admins;