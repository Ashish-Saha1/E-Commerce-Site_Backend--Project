const mongoose = require('mongoose');
const dbgr = require('debug')('development: mongoose')

const DBConnect = mongoose.connect(`mongodb://127.0.0.1:27017/ECommerceBackend`)
        .then(()=>dbgr('Database connect'), console.log(process.env.DEBUG))
        .catch((err)=>dbgr(`There was an database connect error, ErrorMsg is: ${err}`))



module.exports = DBConnect;