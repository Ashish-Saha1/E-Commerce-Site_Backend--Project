const express = require('express'); 
const router = express.Router();
const OwenerModel = require('../models/ownerModel');
const OwnerModel = require('../models/ownerModel');

// console.log("Owner Route:",process.env.NODE_ENV);
// console.log("Owner Route2:",process.env.check);

router.get('/', (req,res)=>{

    res.send(`This is a Owner check Route`)
})

if(process.env.NODE_ENV === 'development'){

    router.get('/create', (req,res)=>{
    res.send(`Owner Create Successfull`)
    })
    
}




module.exports = router;