import React,{useContext, useEffect, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Context } from "../ContextProvider"
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';
import { IProductItem, ICartItem } from './Item';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  maxWidth: "500px",
  height:350,
  borderRadius:"2px",
  bgcolor: '#e2e1e1',
  boxShadow: 24,
  p: 5,
  overflow:"scroll",
  display:"block",
};

const Container = styled.div`
padding:0 20px;
`

const ButtonsDiv = styled.div`
display: flex;
align-items:"center";
padding-bottom: 2%;

`

function Cart() {
    const {open, handleClose, cart, checkLocalCart, setCart} = useContext(Context)

    
const [cartState, setCartState] = useState<string>()
const [buttonDisabled,setButtonDisabled] = useState<boolean>(false)
console.log("cart är", cart)
let totalPrice = 0


useEffect(() => {
    console.log("cartstate:", cartState)
    
}, [cartState])

useEffect(() => {
  console.log("button is", buttonDisabled)
}, [buttonDisabled])



    for(let i = 0; i < cart.length; i++){
        
        if(cart[i].Count > 1){
            totalPrice += Number(cart[i].ProductItem.Price * cart[i].Count)
           
        }
        else if(cart[i].ProductItem.InStock <= 0){
            setCartState("out of stock")
        }
        else{
       console.log("priset", totalPrice += Number(cart[i].ProductItem.Price))
            
        }
      
    }

 function cartIncrease(increaseThis: any){
   increaseThis.Count += 1
   increaseThis.ProductItem.InStock -= 1;
    setCart([...cart])
  }

  function cartDecrease(decreaseThis: any){
    if(decreaseThis.Count === 1){
      setButtonDisabled(true)
      return
    }
    else{
    decreaseThis.Count -= 1
    decreaseThis.ProductItem.InStock += 1;
     setCart([...cart])
    }
   }

   function removeThisFromCart(inputId: string){
      const removeThis = cart.filter((item: ICartItem) => {
        return item.ID !== inputId
      })

      setCart(removeThis)
   }

const testfetch = JSON.parse(localStorage.getItem("Cart")!)

// useEffect(() => {
//   console.log("testfetch är", testfetch[0]?.Count.length)
// }, [testfetch])


    const cartItems = cart.map((cartItem: ICartItem) => {
        return(
            <>
            <ListItem key={cartItem.ID}>
                
            <ListItemAvatar>
            
              <Avatar src={cartItem.ProductItem.Image}
              sx={{width:"50px", height:"50px"}}/>
            </ListItemAvatar>
            
            <p style={{padding:"0.4em"}}><input style={{width:"25px",}} type="text" value={cartItem.Count.toString()}/></p>
            <ListItemText sx={{padding:"0.5em"}} primary={cartItem.ProductItem.Title} secondary={cartItem.ProductItem.Price + "$"} />
            
          </ListItem>
          <ButtonsDiv>
          <ButtonGroup variant="outlined" sx={{padding:"0"}} >
          <Button
          data-testid={"removefromcart" + cartItem.ProductItem.ID}
          disabled={cartItem.Count == 0 ? true : false}
          size="small"
          sx={{width:"10px"}}
            aria-label="reduce"
            onClick={() => {
              cartDecrease(cartItem)
            }}
          >
            <RemoveIcon fontSize="small" color="error" />
          </Button>
          <Button
          data-testid={"addfromcart" + cartItem.ProductItem.ID}
          disabled={cartItem.ProductItem.InStock == 0 ? true : false}
          color="success"
          size="small"
            aria-label="increase"
            onClick={() => {
              cartIncrease(cartItem)
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
        <Button aria-label="totalremove" sx={{padding:"0"}} onClick={() => removeThisFromCart(cartItem.ID)}><DeleteIcon fontSize="small" /></Button>
        <p style={{padding:0, margin:0}}>In Stock: {cartItem.ProductItem.InStock}</p>
        </ButtonsDiv>
          <Divider variant="middle" />
          
          </>
        )
    })

  return (
    <Container>
      <Modal
      
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open} // ändrade open till true och fade in där nere med ska vara open
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        
        <Fade in={open} >  
          <Box sx={style} aria-label="modal" data-testid="modal">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Cart
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {cartItems}
            </Typography>
            {totalPrice > 0 ?
            <Typography variant="h6" component="h2" sx={{mt: 1.5}}>
              Total: {totalPrice.toFixed(2)}$
            </Typography>: ""
}
          </Box>
        </Fade>
      </Modal>
      </Container>
  );
}

export default Cart