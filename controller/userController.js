

const UserModel = require('../models/userModel') 
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

const deleteUploadedFile = require('../config/deleteUploadedFile');




// To Render a login page
const getRegisterPage = async (req,res,next)=>{
    try {
        res.render('register')
    } catch (error) {
        console.log(error.message)
        res.send(`Can't get Register Page from get Register page (Usercontroller)`)
    }
}

//Register controller
const registerController = async (req,res)=>{
    const {firstName, lastName, email, password, avater} = req.body;

    try {
        if(!firstName || !lastName || !email || !password){
            req.flash('errorMsg', "Required Field")

            if(req.file){             
                deleteUploadedFile(req.file.filename)
            }
    
            return res.redirect('/users/register')
        }

        const userExit = await UserModel.findOne({email})

        if(userExit){
            if(req.file){             
                deleteUploadedFile(req.file.filename)
            }
            return res.send(`User already exit, Please Login`)
        }


        const hashPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            avater : req.file ? req.file.filename : null
            })
    
        const token= generateToken(user)
        res.cookie('token', token)
        req.flash('successMsg', "Registered Successfully")
        res.redirect('login')
    //res.send("User is registered successfully")

    } catch (error) {
        res.send(error.message)
    }

}


// To Render a login page
const getLoginPage = async (req,res,next)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message)
        res.send(`Can't get Login Page from get login page (Usercontroller)`)
    }
}


//Login controller Post 
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

        const token =  generateToken(user)
        res.cookie('token', token)
        res.send(`Login Successfully`)

    } catch (error) {
        res.send(error.message)
    }

}






module.exports = {
    getLoginPage,
    getRegisterPage,
    registerController,
    loginController
}