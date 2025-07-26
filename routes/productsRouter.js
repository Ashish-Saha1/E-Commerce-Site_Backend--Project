const express = require('express'); 
const router = express.Router();
const upload = require("../config/multerUpload");
const ProductModel = require('../models/productModel')

router.get('/', (req,res)=>{
    res.send(`This is a Product check Route`)
})




router.get("/createProduct",upload.single('avater'), (req,res,next)=>{
    const locals = {
        title: "Product Create Page"
    }
    res.render('createProduct', {locals})
    //res.send("This is to get create product page only")
})


router.post("/createProduct", upload.single('avater'), async (req,res,next)=>{

    try {
        const {productName, productDetail, price} = req.body;
        const avater = req.file? req.file.filename: null;
        const discount = req.body.discount ? Number(req.body.discount) : 0;
        const stock = req.body.stock ? Number(req.body.stock) : 0;

            if(!productName || !productDetail || !price || !avater){
                req.flash('errorMsg', "Please fill up all field")
                return res.redirect("/products/createProduct")
                
            }

            const product = await ProductModel.create({
                productName,
                productDetail,
                price,
                avater,
                discount,
                stock
            })

    
            req.flash('successMsg', "Registered Successfully")
            res.redirect("/products/createProduct")

    } catch (error) {
        console.log(error.message)
        res.send('Product not created')
    }
})



router.get('/productDetails/:id', async (req,res)=>{
    const params = req.params.id;
    const locals = {
        title: "Product Create Page"
    }

    try {

        const product = await ProductModel.findOne({_id : params})

        console.log(product);
        

        res.render('productDetails', {locals, product})
    } catch (error) {
        
    }

    
})









module.exports = router;