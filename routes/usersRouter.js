const express = require('express'); 
const router = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn');
const UserModel = require('../models/userModel');
const ProductModel = require('../models/productModel');

const { registerController,
        loginController, 
        getLoginPage, 
        getRegisterPage,
        shopController

        } = require('../controller/userController');
const upload = require('../config/multerUpload');
const flash = require('flash');







router.get('/', (req,res)=>{
    res.send(`This is a User check Route`)
})

//Create/Register a User Get method

router.get('/register', getRegisterPage)


//Create/Register a User
router.post('/register', upload.single('avater'), registerController)



//Login User Get method
router.get('/login', getLoginPage)


//Login User
router.post('/login', loginController)







//Shop
router.get('/shop', isLoggedIn, shopController)


//Contact
router.get('/contact', (req,res,next)=>{
    const locals = {
        title : "Contact"
    }
    res.render('contact', {locals})
})


//Profile
router.get('/profile', (req,res,next)=>{
    res.render('profile') 
})




//Cart
router.get('/cart', isLoggedIn, async (req,res,next)=>{
    const locals = {
        title : 'Cart'
    }

  try {
      const userId = req.user._id;
      const currentUser = await UserModel.findById(userId)
                        .populate('cart.product')

    const totalAmount = currentUser.cart.reduce((total, num)=>{
        return Number(total) + Number(num.product.price)
    }, 0)

    // const totalCartItem = currentUser.cart.reduce((total, num)=>{
    //     return Number(total) + Number(num.quantity)
    // }, 0)

    res.render('cart', {locals, currentUser, totalAmount}) 

  } catch (error) {
    console.log(error.message)
    res.send(`Problem form cart get page`)
  }
})


router.post('/cart/:productId',isLoggedIn, async (req,res,next)=>{

    try {
            const productId = req.params.productId;
            const userId = req.user._id

            const user = await UserModel.findOne(userId)
                //The first matching object from the user.cart array where the condition is true
                //Or undefined if no match is found.
            let hasCartItem = user.cart.find((item)=> item.product._id.toString() === productId)
            
            if(hasCartItem){
                req.flash('successMsg', "Product has already Added to Cart")                
                return res.redirect('/users/cart')
            }
            
            //user.cart.push(product);
            user.cart.push({ product: productId, quantity: 1 });

            await user.save();
            res.redirect('/users/cart')

    } catch (error) {
        console.log(error.message)
        res.send('something wrong form cart route')
    }
   


})


const mongoose = require('mongoose');

router.post('/remove-from-cart/:productId', isLoggedIn, async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send("Invalid product ID");
    }

    const deleted = await UserModel.findByIdAndUpdate(userId, {
      $pull: {
        cart: {
          product: new mongoose.Types.ObjectId(productId)
        }
      }
    });

    req.flash('successMsg', "Product has been removed")
    res.redirect('/users/cart');
  } catch (error) {
    console.log(error.message);
    res.send('Something went wrong in cart delete route');
  }
});



router.put('/update-cart-quantity', isLoggedIn, async(req,res,next)=>{

    const {productId, action} = req.body;
    const userId = req.user._id

    try {
      const user = await UserModel.findById(userId);
      const item = user.cart.find(i => i.product.toString() === productId);

      if (!item) return res.status(404).json({ message: 'Item not found in cart' });

      if(action === 'dec' && item.quantity <= 1){
        return res.status(404).json({ message: 'Minimum quanty is 1' });
      }

      const update = {
        $inc: {"cart.$.quanty": action = 'inc' ? 1 : -1}
      }

      await UserModel.updateOne(
        {_id : userId, 'cart.product': productId}, update
      )
      
      res.json({ message: 'Quantity updated' });
    } catch (error) {
      console.log(error.message);
      res.send('something wrong in Update cart count')
    }





})






//Logout
  router.get('/logout', (req,res,next)=>{
    const token = req.cookies.token
    res.clearCookie('token')
    res.redirect('login')
})  














module.exports = router;