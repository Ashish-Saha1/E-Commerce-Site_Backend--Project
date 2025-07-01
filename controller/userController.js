

const UserModel = require('../models/userModel') 
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');


//Register controller
const registerController = async (req,res)=>{
    const {fullname, email, password} = req.body;

    try {
        if(!fullname || !email || !password){
            return res.status(403).send('Required field')
        }

        const userExit = await UserModel.findOne({email})

        if(userExit){
            return res.send(`User already exit, Please Login`)
        }


        const hashPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            fullname,
            email,
            password: hashPassword
            })
    
        const token= generateToken(user)
        res.cookie('token', token)

    res.send("User is registered successfully")

    } catch (error) {
        res.send(error.message)
    }

}



//Login controller
const loginController = async (req,res)=>{
    const {email, password} = req.body;

    try {

            if(!email || !password){
                return res.status(403).send('Required field')
            }


        const user = await UserModel.findOne({email})

        if(!user){
            return res.send(`Email or Password is not correct`)
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword){
            return res.send(`Email or Password is not correct`)
        }

        res.send(`Login Successfully`)

    } catch (error) {
        res.send(error.message)
    }

}






module.exports = {
    registerController,
    loginController
}