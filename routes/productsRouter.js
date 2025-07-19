const express = require('express'); 
const router = express.Router();
const upload = require("../config/multerUpload");
const ProductModel = require('../models/productModel')

router.get('/', (req,res)=>{
    res.send(`This is a Product check Route`)
})




router.get("/createProduct",upload.single('avater'), (req,res,next)=>{
    res.render('createProduct')
    //res.send("This is to get create product page only")
})


router.post("/createProduct", async (req,res,next)=>{

    try {
        // const {productName, productDetail, discount, price, avater, stock} = req.body;

            // if(!productName || !productDetail || !price || !avater){
            //     return res.send(`Please fill all fields`)
            // }

            // const product = await ProductModel.create({
            //     productName,
            //     productDetail,
            //     price,
            //     avater,
            //     discount,
            //     stock
            // })

            const aaa = req.body;
        console.log(aaa)
            res.send("Product Create Successfully")

    } catch (error) {
        console.log(error.message)
        res.send('Product not created')
    }
})













module.exports = router;