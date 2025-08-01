
const UserModel = require('../models/userModel')

const cartItemCount = async (userId)=>{

    const user =  await UserModel.findById(userId)

    if(!user || !user.cart) return 0;

   return user.cart.reduce((total, item) => {
            return Number(total) + Number(item.quantity);
        }, 0);
}




const totalCartAmount = async (userId)=>{

    const user =  await UserModel.findById(userId)
                    .populate('cart.product')

    if(!user || !user.cart) return 0;



        return user.cart.reduce((total, item) => {
            return Number(total) + Number(item.product.price);
            }, 0);

    

   

}


module.exports = { cartItemCount, totalCartAmount };