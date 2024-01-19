const { json } = require("body-parser");
const productModel = require("../models/productModel");
const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    res.status(404).send("Internal server error");
  }
};

const addProduct = async (req, res) => {
  try {
    let data = JSON.parse(req.body.data);

    console.log("This is check", req.body.data);

    console.log("data", data);
    console.log("check the image", req.file);
    let newProductsObj = {...data, imageUrl: req.body.file };
    const newProducts = await productModel.create(newProductsObj);

    res.json(newProducts);
  } catch (error) {
    console.log("Error", error);
    res.status(404).send("Internal server error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    let product = await productModel.findByIdAndDelete(productId);
    if (!product) {
      res.json("Please give proper Id");
      return;
    }
    res.json(product);
  } catch (error) {
    {
      console.log("Error", error);
      res.status(404).send("Internal server error");
    }
  }
};

const updateProduct =async(req,res)=>{
  try {
    const productId=req.params.productId
    // console.log(req)
   let data =JSON.parse(req.body.data)
   console.log(data)
  //  let newProductObj ={...data}
 
   let newproduct =await productModel.findByIdAndUpdate(productId,data)
   res.json(newproduct)
    
  } catch (error) {
    console.log(error)
    res.status(404).send("Internal server error");
    
  }

}
module.exports = { getProducts, addProduct, deleteProduct,updateProduct};
