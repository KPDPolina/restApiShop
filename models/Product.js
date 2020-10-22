const { Schema, model } = require('mongoose')

const poductShema = new Schema({
  title: {
    type: String,
    required: true
  },
//   price: {
//     type: Number,
//     required: true
//   },
//   category: {
//     type: String,
//     required: true
//   },
//   supplier: {
//     type: String,
//   },
  inTheBasket: {
    type: Boolean,
    default: false
  }

})
module.exports = model('Product', poductShema) //модель под названием Product