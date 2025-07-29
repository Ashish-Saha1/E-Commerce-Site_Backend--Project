const UserModel = require('../models/userModel');


const totalCartItem = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await UserModel.findById(req.user._id);
      console.log('cartCount:' ,user)
      res.locals.totalCartItem = user.cart.reduce((sum, item) => sum + item.quantity, 0);
    } else {
      res.locals.totalCartItem = 0;
    }
    next();
  } catch (error) {
    console.error('Cart Count Middleware Error:', error.message);
    res.locals.totalCartItem = 0;
    next(); // Still continue even if something fails
  }
};

module.exports = totalCartItem;

 