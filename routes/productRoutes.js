const express = require("express");
const { getProducts, addProduct, deleteProduct, updateProduct, getProductById, getProductBySellerId } = require("../controllers/productController");
const authCheck = require("../middlewares/auth");
const roleGuard = require("../middlewares/roleGuard");
const router = express.Router();
const upload = require("../middlewares/upload");

router.get("/",
 authCheck, roleGuard(["user", "admin","seller"]),
 getProducts);

 router.get("/seller/",authCheck,getProductBySellerId)


router.post(
  "/",
  authCheck,
  roleGuard("seller"),
  upload.single("image"),
  addProduct
);
//get a products by Id
router.get("/:productId",getProductById)

//delete products by Id
router.delete("/:productId",
authCheck,
roleGuard("seller"),deleteProduct)

//update a product by Id
router.put(
  "/:productId",
  authCheck,
  roleGuard("seller"),
  upload.single("image"),
  updateProduct
);

module.exports = router;
