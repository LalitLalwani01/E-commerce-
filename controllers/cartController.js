const Cart = require("../models/cartModel");

const userCart=async(req,res)=>{
    try {
        const userId =req.params.userId
   
        let cartData= await Cart.find({userId:userId}).populate("items.productId")
        // console.log(cartData)
    
    if(!cartData){
        return res.json("Cart does not exist")
    }
    res.json(cartData)
 } catch (error) {
        res.json({error:error})
    }

}
const addCart =async (req,res)=>{
try {
        
        const userId =req.params.userId
        const {productId,quantity}= req.body;
        
        let cart = await Cart.findOne({userId})
        
        if(!cart){
            cart =new Cart({userId,items:[]})
        }
        console.log(cart)
        //check if product is already in the cart
        const existingItem =cart.items.find((item)=>
            item.productId.equals(productId)
        )
        
         console.log(existingItem)
        if(existingItem){
            existingItem.quantity+=quantity ||1
        }
        else{
            let see=cart.items.push({productId, quantity:quantity ||1})
            console.log(see)
        }
    
        await cart.save();
        res.json(cart)
    }
    
 catch (error) {
    res.status(500).json({error:error})
    
    }

}

const removeItem =async (req,res)=>{
    try {
       
        const {userId,productId} =req.params
    
        let cart = await Cart.findOne({userId})
        if(!cart){
          return res.status(404).json("Cart not found")
        }
        console.log(cart,"before")
        let result = cart.items.filter(
            (eachProduct)=> eachProduct.productId != productId
        )
        console.log(result)
        cart.items= result
        await cart.save()
        res.json(result)
        
    } catch (error) {
        res.send(error) 
        
    }

    // console.log(cart)
}


module.exports= {userCart,addCart,removeItem};