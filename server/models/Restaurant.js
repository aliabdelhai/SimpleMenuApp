const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurant = new Schema({
    name: { type: String, required: true },
    menuName: String,
    hasMenu :{type :Boolean , default :false},
    menu: [{type: Schema.Types.ObjectId, ref: 'Dish'}],
    img: String,
    description: String,
    genre: String,
    location: String
})

const Restaurant = mongoose.model('restaurant', restaurant)
module.exports = Restaurant