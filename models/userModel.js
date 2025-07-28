
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    confirmPassword : String,
    // cart: {
    //     type : Array,
    //     default : []
    // },
    cart: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }
],


    orders: {
        type: Array,
        default: []
    },
    contact : String,
    avater: String,
},

{
    timestamps: true
}


)


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;