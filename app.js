const express = require('express');
    require('dotenv').config();
    
const app = express();


//Internal import
const PORT = process.env.PORT

app.get('/', (req,res)=>{
    res.send('Welcome to Get method')
})





app.listen(PORT, ()=>{
   console.log( `Listing on localhost:${PORT}`);
   
})
