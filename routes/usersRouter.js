const express = require('express'); 
const router = express.Router();
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.get('/', (req,res)=>{
    res.send(`This is a User check Route`)
})


//Create a User

router.post('/register', async (req,res)=>{
    const {fullname, email, password} = req.body;

    try {
        if(!fullname || !email || !password){
            return res.status(403).send('Required field')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            fullname,
            email,
            password: hashPassword
            })
    
    const token = jwt.sign({email, id: user._id}, process.env.JWT_SECRET)
                res.cookie('token', token)
    res.send(token,"User is registered successfully")

    } catch (error) {
        res.send(error.message)
    }

})











module.exports = router;