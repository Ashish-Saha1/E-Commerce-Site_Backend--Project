const express = require('express');
require('dotenv').config();   
const app = express();
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require("connect-mongo");


// const config = require('config').get('')


//Internal import
const PORT = process.env.PORT;
const usersRouter = require('./routes/usersRouter');
const ownersRouter = require('./routes/ownersRouters');
const productsRouter = require('./routes/productsRouter');
const totalCartItem = require('./utils/totalCartItem')


//Database connect
    const DBConnect = require('./config/mongoose-connection')



//Use
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(express.static('public'))

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store : MongoStore.create({mongoUrl :process.env.MONGO_URL }),
    cookie : {
        maxAge : 1000 * 60 * 60 *  120//24 * 5 hour
    }
    
}))

app.use(flash())

app.use((req, res, next) => {
    //Pass flash msg
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.passwordMsg = req.flash('passwordMsg');
    res.locals.FlashError = req.flash('FlashError');

    next();
});

app.use((req, res, next) => {
    res.locals.userData = req.session.userData || null;
    res.locals.token = req.cookies.token;
    
    next();
});

app.use(totalCartItem)


//Layouts
app.set('view engine', 'ejs');
app.use(expressLayouts)
app.set('layout', 'layouts/main.ejs')

//Set





app.get('/', (req,res)=>{
    const locals = {
        title : "Home Page"
    }
    res.render('index', {locals})

})



//Routers
app.use('/users', usersRouter);
app.use('/owners', ownersRouter);
app.use('/products', productsRouter);



//Error default
app.use((req,res,next)=>{
    res.send('Route not found')
})

//Error Handler
app.use((err,req,res,next)=>{
    res.send(err.message)
})


app.listen(PORT, ()=>{
    console.log( `Listing on localhost ${PORT}`);
})
