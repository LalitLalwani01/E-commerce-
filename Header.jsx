import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Link } from "react-router-dom";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "@emotion/react";
import secureLocalStorage from "react-secure-storage";
import { ADMIN_ROLE, SELLER_ROLE } from "./constants/userRoles";

// import { ThemeContext } from "../Theme";

const Header = () => {
  const { toggleTheme,isDarkMode } = useContext(ThemeContext);
    // console.log(isDarkMode)
    const userRole = secureLocalStorage.getItem("userRole")
    console.log(userRole)
    return (
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={"/"} style={{color:"inherit", textDecoration:"none"}}>My E-Commerce App</Link>  
       </Typography>

      
          {userRole ==SELLER_ROLE  &&(
            <>
             <Button color="inherit" component ={Link} to= "/seller/products">
             Products
          </Button>
          </>
          )}
      
        <Button color="inherit" component ={Link} to= "/order">
          Order
        </Button>

        <Button color="inherit" component ={Link} to= "/cart">
          Cart
        </Button>

        {userRole ==ADMIN_ROLE &&<>
        <Button color="inherit" component ={Link} to= "/all-users">
          All Users
        </Button>
        </>}
        


      
        
          {/* <BrowserRouter>
          <Routes>
            <Route path="/products"></Route>
          </Routes>
          </BrowserRouter> */}
         
          
        <IconButton color="inherit" onClick={toggleTheme} edge="end">
          {<Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
