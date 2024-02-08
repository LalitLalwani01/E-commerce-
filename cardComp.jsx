import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function  CardComp({product}) {

  console.log(product)
  return (
    <Card sx={{ maxWidth: 345 }}>
      
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{height:"220px"}}
        image={product.imageUrl} 
        // style={{backgroundSize:"contain"}}
        style={{objectFit:'contain',backgroundColor:"",margin:10}}

      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">${product.price}</Button>
        <Button size="small">Add to cart</Button>
       
      </CardActions>
    </Card>
  );
}