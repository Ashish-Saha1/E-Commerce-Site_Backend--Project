const express = require('express'); 
const router = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn')
// const UserModel = require('../models/userModel') 
// const bcrypt = require('bcrypt');


const { registerController,loginController, getLoginPage, getRegisterPage} = require('../controller/userController');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })






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


router.get('/pro', isLoggedIn, (req,res,next)=>{
   
    res.render('pro')
})





module.exports = router;