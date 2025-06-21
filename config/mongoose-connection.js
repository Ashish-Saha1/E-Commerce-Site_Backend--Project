const mongoose = require('mongoose');


const DBConnect = mongoose.connect(`mongodb://localhost/ECommerceBackend`)
                .then(()=>console.log('Database connect'))
                .catch((err)=>console.log(err))



module.exports = DBConnect;