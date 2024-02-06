const express =require("express");
const { addCart, userCart, removeItem } = require("../controllers/cartController");
const router =express.Router()

router.get("/:userId",userCart)
router.post("/:productId",addCart)
router.delete("/remove/:userId/:productId",removeItem)

module.exports =router;