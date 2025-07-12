const express = require('express'); 
const router = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn')
// const UserModel = require('../models/userModel') 
// const bcrypt = require('bcrypt');


const { registerController,loginController} = require('../controller/userController');



router.get('/', (req,res)=>{
    res.send(`This is a User check Route`)
})


//Create/Register a User

router.post('/register', registerController)



//Login User
router.post('/login', loginController)


router.get('/pro', isLoggedIn, (req,res,next)=>{
   
    res.send('Just check isloggedIn')
})





module.exports = router;