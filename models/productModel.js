
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image : String,
    name : String,
    price : Number,
    discount: {
        type : Number,
        default : 0
    },
    bgColor : String,
    panelColor : String,
    textColor : String,
})


const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;