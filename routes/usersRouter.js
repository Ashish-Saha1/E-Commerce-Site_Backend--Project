const express = require('express'); 
const router = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn')

const { registerController,loginController, getLoginPage, getRegisterPage} = require('../controller/userController');
const upload = require('../config/multerUpload');




// const multer  = require('multer');
// const path = require('path');



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         const extName = path.extname(file.originalname);

//     const fileName = file.originalname.replace(extName, "")
//                                         .toLowerCase()
//                                         .split(' ')
//                                         .join("_") + "_" + Date.now()

//         cb(null, fileName + extName)
        
//     }
// })

// const upload = multer({ 
//     storage : storage,
//     limits: {
//         fileSize : 3000000, //1mb
//     },
//     fileFilter : (req,file,cb)=>{
//         if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
//             cb(null, true)
//         }else{
//             cb(new Error("Don't accept file type which you try to upload"))
//         }
//     }

// }
// )






router.get('/', (req,res)=>{
    res.send(`This is a User check Route`)
})

//Create/Register a User Get method

router.get('/register', getRegisterPage)



//Create/Register a User

router.post('/register', upload.single('avater'), registerController)



//Login User Get method
router.get('/login', getLoginPage)


//Login User
router.post('/login', loginController)

router.get('/products', (req,res,next)=>{

    res.render('products')
    
})

router.get('/profile', (req,res,next)=>{

    res.render('profile')
    
})





module.exports = router;