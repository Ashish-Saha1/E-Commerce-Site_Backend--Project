
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    avater : String,
    productName : String,
    price : String,
    productDetail : String,
    discount: {
        type : Number,
        default : 0
    },
    stock: {
        type : Number,
        default : 1
    },
    color: String,
    brand: String,
    type : String,
    material : String

})


const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;