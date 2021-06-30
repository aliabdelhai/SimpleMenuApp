const mongoose = require('mongoose')
const Schema = mongoose.Schema
var mongoosePaginate = require('mongoose-paginate');

const restaurant = new Schema({
    name: { type: String, required: true },
    menuName: String,
    hasMenu :{type :Boolean , default :false},
    menu: [{type: Schema.Types.ObjectId, ref: 'Dish'}],
    img: String
})

restaurant.plugin(mongoosePaginate);

const Restaurant = mongoose.model('restaurant', restaurant)

module.exports = Restaurant