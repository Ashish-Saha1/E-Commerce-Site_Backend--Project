
const fs = require('fs');


const deleteUploadedFile = (filename)=>{
    const filePath = `uploads/${filename}`
    fs.unlink(filePath, (err)=>{
        if(err){
            console.log('Error uploaded file remove problem', err);
            
        }else{
            console.log('Uploaded file is deleted successfully');
            
        }
    })
}



module.exports = deleteUploadedFile