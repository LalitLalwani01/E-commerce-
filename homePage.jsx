// import { Box } from "@mui/material";
import CardComp from "./cardComp";
// import Navbar from "./navbar"
import ProductList from "./productList";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "./Header"


const HomePage = () => {
  const [productsData, setproductsData] = useState([]);
  const getProductsData = async () => {
     
    let token= Cookies.get("authToken")
    console.log('token',token)
    const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`,{
    headers:{
      Authorization:token
    }

    });
    setproductsData(result.data);
    console.log(result);
  };

  useEffect(() => {
    getProductsData();
  }, []);
  return (
    <>
       <Header/>
      <ProductList productsData={productsData}></ProductList>
    </>
  );
};

export default HomePage;
