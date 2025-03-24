const mongoose = require("mongoose")

var mongoUrl = 'mongodb+srv://vanapatlasanjaykumar134:Sanju12345@fooddish.muu5s.mongodb.net/FoodDishes';

mongoose.connect(mongoUrl);

db  = mongoose.connection

db.on('connected', console.log.bind(console, 'connection established'));

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;