
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

   const isLoggedIn = async (req,res,next)=>{
        try {
            const token = req.cookies.token;
            if(!token){
                req.flash("FlashError", "You need to login first")
                return res.send(`Not Authenticated`)
            }

            const decode = await jwt.verify(token, process.env.JWT_SECRET)
        
            const user = await User.findOne({email: decode.email}).select("-password")
            req.user = user;
       
            next()

        } catch (error) {
            req.flash("FlashError", "Something went wrong")
            console.log(error.message);
            
        }
    }



     module.exports = {isLoggedIn}