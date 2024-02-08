import { useEffect } from "react";
import "./App.css"
import axios from "axios";
import HomePage from "./assets/components/homePage";
import LoginPage from "./assets/components/loginPage";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import RegisterForm from "./assets/components/registerForm";
import SellerProductsPage from "./assets/components/seller-products";
import AddProducts from "./assets/components/addProducts";

function App() {

//   useEffect(()=>{
//   const fetchProductsData = async ()=>{
//     let result =await axios.get("http://localhost:5010/products")
//     // let res= await fetch("http://localhost:5010/products")
//     // let result =await res.json()


//     console.log(result)
//   };
//   fetchProductsData()
// },[])
  return ( <>

  
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/login" element={<LoginPage/>}></Route>
    <Route path="/register" element={<RegisterForm/>}></Route>
    <Route path="seller/products" element={<SellerProductsPage/>}></Route>
    <Route path="seller/products/add" element={<AddProducts/>}></Route>

  </Routes>
  </BrowserRouter>
  </> );
}

export default App;