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

    router.post('/create', async (req,res)=>{
        const {fullname, email, password} = req.body;

        const isOwner = await OwnerModel.find();

        if(isOwner.length>0){
            return res.status(500).send('Only one owner is accepted')
        }
        const owner = await OwnerModel.create({
            fullname,
            email,
            password
        })

        res.status(201).send(owner)
    })
    
}




module.exports = router;