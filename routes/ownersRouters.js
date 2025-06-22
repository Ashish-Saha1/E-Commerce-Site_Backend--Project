const express = require('express'); 
const router = express.Router();


console.log("Owner Route:",process.env.NODE_ENV);

router.get('/', (req,res)=>{

    res.send(`This is a Owner check Route`)
})

if(process.env.NODE_ENV === 'development'){
    console.log('Print Development');
    
}







module.exports = router;