import React, { useContext, useEffect, useState } from "react";
import { Context } from "../ContextProvider";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import { nanoid } from "nanoid";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

import { ICartItem, IProductItem } from "../Components/Item";
import Skeleton from "@mui/material/Skeleton";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from "@mui/material";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  flex-direction:column;
  
`;

const EventUL = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 0;
  padding: 0;
  max-width: 1000px;
  gap: 1.3em;
  justify-content:center;
`;
const EventsLI = styled.li`
  padding: 0;
  margin: 0;
  margin-top: 6em;
  max-height: 250px;
  max-width: 300px;
  width: 100%;
  margin-bottom: 2em;
  
`;

const CartreviewDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  margin-bottom: 1em;
`;

function Cards() {
  const { products, setCart, cart, setProducts, searchedProducts, loggedIn } = useContext(Context);
  const [notice, setNotice] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true)
  const [filterSelect, setFilterSelect] = useState<string>("")

  function addToCart(productItem: IProductItem) {
    setNotice(true);

    let newCartItem: ICartItem = { ID: nanoid(), ProductItem: productItem, Count: 1 };

    // If an item is already found in cart, increment the count
    let found: Boolean = false;
    cart.forEach((cartItem: ICartItem) => {
      if (cartItem?.ProductItem?.ID == productItem?.ID) {
        cartItem.Count += 1;
        cartItem.ProductItem.InStock -= 1;
        found = true;
      }
    });

    

    if (!found) {
      setCart([...cart, newCartItem]);
      return
    }
    setCart([...cart])
  }

useEffect(() => {
  if(products){
    setLoading(false)
  }
}, [])

function filterSelectFunction(filterValue: string){
  console.log("den är", filterValue)
  setProducts(searchedProducts)
  setFilterSelect(filterValue)

  if(filterValue !== ""){
    console.log("porrducts", products)
    const filteredCategory = products.filter((data: any) => {
      console.log("data är",data)
      return data.Category.toLowerCase().includes(filterValue.toLowerCase()); 
    })

    setProducts(filteredCategory)
    
  }
 
}

// useEffect(() => {
//   console.log("searched products", searchedProducts)
// }, [products])


  const prodz = products.map((product: IProductItem) => {
    return (
      
      <EventsLI key={product.ID}>
        <CardActionArea >
          <Card  sx={{ maxWidth: 320, backgroundColor: "rgb(247, 245, 245)" }}>
            {!loading ? 
            <CardMedia
              component="img"
              height="140"
              image={product?.Image}
              alt={product.Description}
            />
  : (
    <Skeleton variant="rectangular" height={140} />
  )}

            <CardContent >
              {!loading ? 
              <Typography gutterBottom variant="h5" component="div">
                {product.Title.substring(0, 17)}..
              </Typography>
  : (
    <Typography variant="h4"><Skeleton width="100%"/></Typography>
  )}
              <Typography variant="h5" mb={1}>
                {product?.Price}$
                
              </Typography>
              <Typography  variant="body2" color="#333">
                {product.Description.substring(0, 90)}...
              </Typography>
            </CardContent>
            <CardActions>
              <CartreviewDiv>
               <Button
                data-testid={"add" + product.ID}
                  size="medium"
                  color="success"
                  variant="contained"
                  
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </Button>
                <Rating
                  name="text-feedback"
                  value={product?.Rating?.Rate}
                  readOnly
                  precision={0.5}
                  size="small"
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </CartreviewDiv>
            </CardActions>
  
          </Card>
          
        </CardActionArea>
      </EventsLI>
    );
  });
  return (
    <Container >
      <p data-testid="cart-1"></p>
       
      <EventUL aria-label="textinhere">{prodz}</EventUL>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={notice}
        autoHideDuration={2000} 
        onClose={() => setNotice(false)}
      >
        <Alert variant="filled" severity="success">
          Product added to cart!
        </Alert>
      </Snackbar>
     
    </Container>
  );
}

export default Cards;
