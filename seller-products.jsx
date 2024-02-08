import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { BACKEND_URL } from './constants/routes'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import secureLocalStorage from 'react-secure-storage';
import Swal from 'sweetalert2';


const SellerProductsPage = () => {

  const [products,setProducts] =useState([])
  const token = Cookies.get("authToken")
  const navigate =useNavigate()

    
           
    async function  fetchProductsData(){
      let products =await axios.get(`${BACKEND_URL}/products/seller`,{
        headers:{
          Authorization:token
        }
      })
      setProducts(products.data)
      // console.log(products)
    }
    
 useEffect(()=>{
      fetchProductsData()

  },[])


  const handleEdit =(productId)=>{
    //implement the edit functionality
    console.log(`Edit product with ID:${productId}`)

  
    navigate(`/seller/product/edit/${productId}`)
     
  }
  //implement the delete functionality

   const handleDelete= async(productId) =>{
    const isConfirmed =await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    
    
    if (isConfirmed.isConfirmed) {
     
    let response =await axios.delete(`${BACKEND_URL}/products/${productId}`);
        
    console.log(`Edit the product with ID:${productId}`)
    
    console.log(response)

    
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
 
}


   }
  
  const userRole =secureLocalStorage.getItem("useRole");
  console.log("userRole",userRole)

  return (
    <>
       <Header/>
    <Container>
      <Box
          sx={{
            display:"flex",
            justifyContent:"space-between",
            marginTop:"20px",
            marginBottom:"30px"
          }}>
        
         <Typography variant='h5'  gutterBottom>
          Seller Products          
        </Typography>
            
          <Button variant="contained" color='primary' onClick= {()=>navigate("/seller/products/add")}>
            Add Products
          </Button>
            </Box>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">stock</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        
        <TableBody>
        {products.map((product)=>(
           <TableRow key={product._id}>
             <TableCell>{product.name}</TableCell>
             <TableCell align="right">{product.description}</TableCell>
             <TableCell align="right">${product.price.toFixed(2)}</TableCell>
             <TableCell align="right">{product.stock}</TableCell>
             <TableCell align="right">{product.category}</TableCell>
             <TableCell align="right">{product.actions}</TableCell>
           <TableCell>
           <Button variant="contained" color='primary' onClick={()=>handleEdit(product._id)}>
            Edit
          </Button>

           <Button variant="contained" color='error' onClick={()=>handleDelete(product._id)}>
             Delete 
           </Button>
           </TableCell>
           </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
  </>
  );
}
export default SellerProductsPage