
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname : String,
    email : String,
    password : String,
    cart: {
        type : Array,
        default : []
    },
    isAdmin : Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact : String,
    picture: String
})


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;