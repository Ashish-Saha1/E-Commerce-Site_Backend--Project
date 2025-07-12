
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

   const isLoggedIn = async (req,res,next)=>{
        const token = req.cookies.token;
        if(!token){
            return res.send(`Not Authenticated`)
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findOne({email: decode.email}).select("-password")
        req.user = user;
       
        next()
    }



     module.exports = {isLoggedIn}