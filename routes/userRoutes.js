const express =require("express");
const {getAllUser, addUser, loginUser, updateUser} = require("../controllers/userController");
const authCheck = require("../middlewares/auth");
const roleGuard = require("../middlewares/roleGuard");
const router =express.Router()

router.get("/",getAllUser)
router.post("/",addUser)
router.post("/login",loginUser)
router.put("/:userId",authCheck,roleGuard,updateUser)



module.exports =router;