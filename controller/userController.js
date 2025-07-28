

const UserModel = require('../models/userModel');
const productModel = require('../models/productModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

const deleteUploadedFile = require('../config/deleteUploadedFile');




// To Render a register page
const getRegisterPage = async (req,res,next)=>{
    try {
        const locals = {
            title : 'Register Page'
        }
        res.render('register', {locals})
    } catch (error) {
        console.log(error.message)
        res.send(`Can't get Register Page from get Register page (Usercontroller)`)
    }
}

//Register controller
const registerController = async (req,res)=>{
    const {firstName, lastName, email, password,confirmPassword, avater} = req.body;

    try {
        if(!firstName || !lastName || !email || !password || !confirmPassword){
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

        if(password !== confirmPassword){
            req.flash('passwordMsg', "Both Password are Not Match")
            if(req.file){             
                deleteUploadedFile(req.file.filename)
            }
            return res.redirect('/users/register')
       
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            avater : req.file ? req.file.filename : null
            })
    
        // const token= generateToken(user)
        // res.cookie('token', token)
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
        const locals = {
            title : 'Login Page'
        }
        res.render('login', {locals})
    } catch (error) {
        console.log(error.message)
        res.send(`Can't get Login Page from get login page (Usercontroller)`)
    }
}


//Login controller Post 
const loginController = async (req,res)=>{
   

    try {
        const {email, password} = req.body;

            if(!email || !password){
                return res.status(403).send('Required field')
            }

        const user = await UserModel.findOne({email})
         req.session.userData = user;
       

        if(!user){
            return res.send(`Email or Password is not correct`)
        }
        
        
        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword){
            return res.send(`Email or Password is not correct`)
        }

        const token =  generateToken(user)
        res.cookie('token', token)
        res.redirect('/users/shop')

    } catch (error) {
        res.send(error.message)
    }

}


const shopController = async (req,res,next)=>{
        const locals = {
            title : "Shop"
        }

    try {
        const products = await productModel.find()
    
    res.render('shop', {locals, products})
    } catch (error) {
        res.status(500).json({JsonMsg: "Something Problem from shopController"})
    }
}






module.exports = {
    getLoginPage,
    getRegisterPage,
    registerController,
    loginController,
    shopController
}