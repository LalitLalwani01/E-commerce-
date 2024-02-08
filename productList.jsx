import { Box, Card } from "@mui/material"
import CardComp from "./cardComp"
import { rootShouldForwardProp } from "@mui/material/styles/styled"
import { useEffect, useState } from "react"
import productsData from "./homePage"

const ProductList =({productsData})=>{
    return(

        <>
            <Box
    m={2}
    pt={2}
    sx={{display:"flex",justifyContent:"space-between", flexWrap:"wrap"}}>

        {productsData && productsData.map((product)=><CardComp product={product}/>
        )}
    </Box>
        </>
    )
}
export default ProductList;