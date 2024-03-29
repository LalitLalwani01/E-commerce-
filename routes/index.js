const express =require("express")
const router =express.Router();
const userRoutes =require("./userRoutes")
const productRoutes =require("./productRoutes")
const cartRoutes =require("./cartRoutes")

router.use("/user",userRoutes)
router.use("/products",productRoutes)
router.use("/cart",cartRoutes)

module.exports =router;

