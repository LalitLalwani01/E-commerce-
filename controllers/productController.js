const { json } = require("body-parser");
const ProductModel = require("../models/productModel");
const getProducts = async (req, res) => {
  try {
    console.log("api testing check")
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(404).send("Internal server error");
  }
};

const addProduct = async (req, res) => {
  try {
    let data = req.body.data;

    console.log("This is check", req.body.data);
    console.log(" this is"  ,req.body.userId)

    console.log("data", data);
    console.log("check the image", req.file);
    let newProductsObj = {...data, userId: req.body.userId };
    const newProducts = await ProductModel.create(newProductsObj);
    res.json({data:newProducts,message:"Product added successfully"}) ;
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal server error");
  }
};


const  getProductById = async(req,res)=>{
  try {
    const productId = req.params.productId;
    // console.log(req)
    const product =await ProductModel.findById(productId)
    if(!product){
      res.status(404).json("Product not found")
    }
   
      res.status(200).json(product)
    
  } catch (error) {
    // console.log(error)
    res.status(500).send("Internal server error")    
  }
}

const getProductBySellerId =async(req,res)=>{

  try {
    
      console.log(req.params)
  const sellerId =req.params.userId

  let allSellerProducts = await ProductModel.find({userId:sellerId})

  res.status(200).json(allSellerProducts)
  } catch (error) {
   res.status(404).json({message:"Internal error occured"}) 
  }



}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    let product = await ProductModel.findByIdAndDelete(productId);
    if (!product) {
      res.json("Please give proper Id");
      return;
    }
    res.json(product);
  } catch (error) {
    {
      console.log("Error", error);
      res.status(500).send("Internal server error");
    }
  }
};

const updateProduct =async(req,res)=>{
  try {
    const productId=req.params.productId
    // console.log(req)
    console.log(req.file)
   let data =JSON.parse(req.body.data)
  //  console.log(data)
   if(req.file){
    newData ={...data,imageUrl:req.file.filename}
   }
   else{
    newData ={...data}
   }
  //  let newProductObj ={...data}
  //  console.log(newData)
   let newproduct =await ProductModel.findByIdAndUpdate(productId,newData)
   if(!newproduct){
    res.staus(404).send("Product not found")
   }
   res.json(newproduct)
    
  } catch (error) {
    console.log(error)
    res.status(500).send({error:error});
    
  }



}
module.exports = { getProducts, addProduct, deleteProduct,updateProduct,getProductById,getProductBySellerId};
