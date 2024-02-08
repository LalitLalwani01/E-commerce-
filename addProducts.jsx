// import Select from "react-select"
import * as yup from 'yup'
import { useForm, Controller } from "react-hook-form"
// import { Input } from "@material-ui/core"
import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import { yupResolver } from '@hookform/resolvers/yup';
import Header from './Header';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BACKEND_URL } from './constants/routes';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import React ,{ useEffect } from 'react';



const schema = yup
  .object()
  .shape({
    name: yup.string().required("Product Name is required"),
    description: yup.string().required("Description is required"),
    price:yup.number().required("Price is required").positive("price must be positive"),
    stock:yup.number().required("Stock is required").positive("Stock must be positive"),
    category:yup.string().required("Category is required"),
    color:yup.string().required("Color is required"),
    size:yup.number().required("Size is required"),
    image:yup.mixed().required("Image is required")
  })
  .required();

  
  const addProducts = ({history}) => {
    
    const {productId} =useParams();
    const navigate =useNavigate()

    //pure functions 
    const fetchProductsById =async(proId)=>{
      let response =await axios.get(`${BACKEND_URL}/products/${proId}`)

      let productData=response.data;
      console.log("the result",response.data)
      setValue("name",productData.name),
      setValue("category",productData.category),
      setValue("description",productData.description),
      setValue("color",productData.color),
      setValue("stock",productData.color)
      setValue("price",productData.price)
      setValue("size",productData.size),
      setValue("image",productData.image)
    }
    
    useEffect(()=>{
      if(productId){
        fetchProductsById(productId);
      }

    },[productId])
  const { control, handleSubmit,setValue, formState:{errors}}  = useForm({
      resolver:yupResolver(schema)   

  })
  console.log("The error",errors);


  const onSubmit = async(data) =>{
    try {
      const token=Cookies.get("authToken");
    
      console.log("token?>>>",token)
    


      const dataObj ={
        name:data.name,
        description:data.description,
        price:data.price,
        stock:data.stock,
        category:data.category, 
        image:data.image,
        // attributes:data.attributes,
      
        attributes :[
          {name:"Color",value:data.color},
          {name:"Size",value:data.size}
        ]
      }
      
      let response;
      let config={
    headers:{
      Authorization:token
    }
      }
      if(productId){
        console.log("The edit funtion")

        response= await axios.put(`${BACKEND_URL}/products/${productId}`,
        dataObj,
        config
        )
      }
      else{
        response = await axios.post(`${BACKEND_URL}/products`,
        {data:dataObj},
          config
        )
      }
        console.log("response>>>>>",response)
      if(response.status==200){
        toast.success(response.data.message,{
          position:"top-right"
          });

       setTimeout(()=>{
        navigate("/seller/products");
       },1000)
      }else{
        toast.error("Not worked",{
          position:"top-right"
          });
      }
    } 

    catch (error) {
      console.log("Error adding product",error)
    }
  };


  return (
    <>

    <Header/>
     <Container>
    <Typography variant='h5' gutterBottom margin={2} marginBottom={4}>
      Add New Products
    </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2}>
     <Grid item xs={12}>    
     <Controller
        name="name"
        control={control}
        render={({ field }) => (
          
          <TextField
          fullWidth
          label="Product Name"
          varient="outlined"
          {...field}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        )}
      />
      </Grid>
  
        <Grid item xs={12}>
       <Controller
        name="description"
        control={control}
        render={({ field }) => (
          
          <TextField
          fullWidth
          label="Product Description"
          varient="outlined"
          rows={4}
          multiline
          {...field}
          error={!!errors.name}
          helperText={errors.description?.message}
          />
          )}
       />
        </Grid>
        <Grid item xs={12} sm={6}>
       <Controller
        name="price"
        control={control}
        render={({ field }) => (
          
          <TextField
          fullWidth
          label="Price"
          varient="outlined"
          {...field}
          error={!!errors.name}
          helperText={errors.price?.message}
          />
          )}
       />
        </Grid>

        <Grid item xs={12} sm={6}>
       <Controller
        name="stock"
        control={control}
        defaultValue=""
        render={({ field }) => (
          
          <TextField
          fullWidth
          label="Stock"
          varient="outlined"
          {...field}
          error={!!errors.name}
          helperText={errors.stock?.message}
          />
          )}
       />
        </Grid>

       
        <Grid item xs={12}>
       <Controller
        name="category"
        control={control}
        render={({ field }) => (
          
          <TextField
          fullWidth
          label="Category"
          varient="outlined"
          {...field}
          error={!!errors.name}
          helperText={errors.category?.message}
          />
          )}
       />
        </Grid>

        
        <Grid item xs={12}>
       <Controller
        name="color"
        control={control}
        render={({ field }) => (
          
          <TextField
          fullWidth
          label="Color"
          varient="outlined"
          {...field}
          error={!!errors.name}
          helperText={errors.color?.message}
          />
          )}
       />
        </Grid>

       
        <Grid item xs={12}>
       <Controller
        name="size"
        control={control}
        render={({ field }) => (
          
          <TextField
          fullWidth
          label="Size"
          varient="outlined"
          {...field}
          error={!!errors.name}
          helperText={errors.size?.message}
          />
          )}
       />
        </Grid>

        <Grid item xs={12}>
       <Controller
        name="image"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          
          <TextField
          fullWidth
          label="Image"
          varient="outlined" 
          InputLabelProps={{shrink:true}}
          {...field}
          error={!!errors.name}
          helperText={errors.image?.message}
          />
          )}
       />
        </Grid>
      <Grid item xs={12}>
    <Button type='submit' variant='contained' margin="20px">Add Me</Button>
      </Grid>

    </Grid>
    </form>
    </Container>
    <Toaster/>
    </>
    )
}

export default addProducts;