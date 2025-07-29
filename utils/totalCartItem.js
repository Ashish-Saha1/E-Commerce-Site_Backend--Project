const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken')

const totalCartItem = async (req, res, next) => {

    const token = req.cookies.token;
   
      if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // your secret
      req.user = decoded; // attach the user payload to request

    if (req.user) {
        const user = await UserModel.findById({_id: req.user.id});
        res.locals.totalCartItem = user.cart.reduce((total, item) => {
            return Number(total) + Number(item.quantity);
        }, 0);
        }

       

    } catch (err) {
      console.error('Invalid token:', err.message);
      res.locals.totalCartItem = 0;
      req.user = null;
    }
  } else {
    res.locals.totalCartItem = 0;
    req.user = null;
  }
  next();
};





  


module.exports = totalCartItem;

 