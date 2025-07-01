
const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({
    fullname : {
        type: String,
        minLength : 3,
        trim : true
    },
    email : String,
    password : String,
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin : String
})


const OwnerModel = mongoose.model('Owner', OwnerSchema);

module.exports = OwnerModel;