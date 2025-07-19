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







//Shop
router.get('/shop', isLoggedIn, (req,res,next)=>{
    const locals = {
        title : "Shop"
    }
    // console.log('Session userData:', req.session.userData);
    res.render('shop', {locals})
})


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


//Logout
  router.get('/logout', (req,res,next)=>{
    const token = req.cookies.token
    res.clearCookie('token')
    res.redirect('login')
})  

module.exports = router;