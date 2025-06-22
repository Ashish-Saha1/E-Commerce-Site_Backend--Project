const express = require('express'); 
const router = express.Router();


router.get('/', (req,res)=>{
    console.log(process.env.production)
    res.send(`This is a Owner check Route`)
})









module.exports = router;