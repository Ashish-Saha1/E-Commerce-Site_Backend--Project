const express = require('express'); 
const router = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn')

const { registerController,
        loginController, 
        getLoginPage, 
        getRegisterPage

        } = require('../controller/userController');
const upload = require('../config/multerUpload');







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


//Products
router.get('/products', isLoggedIn, (req,res,next)=>{
    const locals = {
        title : "Products"
    }
    console.log('Session userData:', req.session.userData);
    res.render('products', {locals})
})


//Profile
router.get('/profile', (req,res,next)=>{
    res.render('profile') 
})


//Logout
  router.get('/logout', (req,res,next)=>{
    const token = req.cookies.token
    res.clearCookie('token')
    res.redirect('login')
})  

module.exports = router;