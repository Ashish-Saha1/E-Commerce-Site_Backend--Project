const mongoose = require('mongoose');


const DBConnect = mongoose.connect(`mongodb://127.0.0.1:27017/ECommerceBackend`)
                .then(()=>console.log('Database connect'))
                .catch((err)=>console.log(`There was an database connect error, ErrorMsg is: ${err}`))



module.exports = DBConnect;