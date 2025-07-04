const express = require('express');
require('dotenv').config();   
const app = express();
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const ejs = require('ejs');
// const config = require('config').get('')


//Internal import
const PORT = process.env.PORT;
const usersRouter = require('./routes/usersRouter');
const ownersRouter = require('./routes/ownersRouters');
const productsRouter = require('./routes/productsRouter');


//Database connect
    const DBConnect = require('./config/mongoose-connection')



//Use
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(express.static('public'))

//Set
app.set('view engine', 'ejs')




app.get('/', (req,res)=>{
    
    res.render('index')

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
