const multer  = require('multer');
const path = require('path');



    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            const extName = path.extname(file.originalname);

        const fileName = file.originalname.replace(extName, "")
                                            .toLowerCase()
                                            .split(' ')
                                            .join("_") + "_" + Date.now()

            cb(null, fileName + extName)
            
        }
    })

    const fileFilter = (req,file,cb)=>{
            if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
                cb(null, true)
            }else{
                cb(new Error("Don't accept file type which you try to upload"))
            }
        }

    const upload = multer({ 
        storage : storage,
        limits: {
            fileSize : 3 * 1024 * 1024, //1mb
        },
        fileFilter : fileFilter

    }
    )




module.exports = upload



