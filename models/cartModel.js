const mongoose =require("mongoose")

const {Schema} =mongoose

const cartSchema =Schema({
    userId: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{type:Number,default:1}
        }
    ]
})
const Cart =mongoose.model("Cart",cartSchema)
module.exports =Cart; 
