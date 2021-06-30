const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dish = new Schema({
    name: String,
    price : Number,
    img: String
})

const Dish = mongoose.model('Dish', dish)
module.exports = Dish