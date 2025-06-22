const mongoose = require('mongoose');
const config = require('config');



const DBConnect = mongoose.connect(`${config.get('MONGO_URI')}/ECommerceBackend`)

        .then(()=>console.log('Database connect'))
        .catch((err)=>console.log(`There was an database connect error, ErrorMsg is: ${err}`));




module.exports = DBConnect;