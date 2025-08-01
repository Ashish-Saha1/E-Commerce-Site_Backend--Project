const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const { cartItemCount } = require('./cartItemCount')

const totalCartItem = async (req, res, next) => {

    const token = req.cookies.token; 
    try {
      if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET); // your secret
          req.user = decoded; // attach the user payload to request

      if (req.user) {
          res.locals.totalCartItem = await cartItemCount(req.user.id)
          }else{
            res.locals.totalCartItem = 0;
          }

    }else{
        res.locals.totalCartItem = 0;
      }
  } catch (err) {
      console.error('Invalid token:', err.message);
      res.locals.totalCartItem = 0;
      req.user = null;
    }
  next();
};





  


module.exports = totalCartItem;

 