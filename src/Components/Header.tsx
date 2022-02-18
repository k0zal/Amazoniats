import React, { useContext, useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Modal } from "@mui/material";
import { TextField } from "@mui/material";
import Alert from '@mui/material/Alert';

import Cart from "./Cart";
import { Context } from "../ContextProvider";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function SearchAppBar() {
  const { handleOpen, searchForItem, cart, setLoggedIn, loggedIn, products } = useContext(Context);
  const [open, setOpen] = React.useState(false);
  
  const openLogin = () => setOpen(true);
  const closeLogin = () => setOpen(false);
  const [username, setUsername] = useState<string>("");
  const [firstLast, setFirstLast] = useState<string>("")
  const [adminOrUser, setAdminOrUser] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [password, setPassword] = useState<string>("");

  const [cartNumber, setCartNumber] = useState<number>();

  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    cartTotal += Number(cart[i].Count);
  }

  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  console.log(cartTotal);

  function handleLogin(){
    setErrorMessage("")

    if(username === "user" && password === "user"){
      setFirstLast("Ture Sventon")
      setAdminOrUser("User")
      setLoggedIn(true)
      localStorage.setItem("logged", JSON.stringify(loggedIn))
    }
    else if(username === "admin" && password === "admin"){
      setFirstLast("Lars Sqlsson")
      setAdminOrUser("Admin")
      setLoggedIn(true)
      localStorage.setItem("logged", JSON.stringify(loggedIn))
    }
    else if(username !== "user" && username !== "admin"){
      setErrorMessage("Account not found")
    }
    

    else if(username === "user" || username === "admin" && password !== "admin" || "user"){
      
      setErrorMessage("Invalid Password")
    }

  
  }

  

  function handleSignOut(){
    setLoggedIn(false)
    localStorage.setItem("logged", JSON.stringify(loggedIn))
  }

  useEffect(() => {
 console.log("logged in state", loggedIn)
  }, [loggedIn])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
          data-testid="openmodal"
            onClick={handleOpen}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Badge color="warning" badgeContent={cartTotal}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button onClick={openLogin} color="inherit">
            {loggedIn ? "Sign out" : "Login"}
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            type="text"
            
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => searchForItem(e.target.value)}
            />
          </Search>
          <Typography ml={5} gutterBottom variant="h5" component="div">
            AMAZONia TECH
          </Typography>
        </Toolbar>
      </AppBar>

      <Modal
    
        open={open}
        onClose={closeLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
        
        sx={style}>
          {!loggedIn ? (
            <>
              <h2 style={{ margin: 0, padding: 0 }}>Login</h2>
              <TextField
              inputProps={{
                maxLength:25,

              }}
                size="small"
                sx={{ width: "70%", marginTop: "1.5em" }}
                id="outlined-name"
                label="Username"
                value={username}
                onChange={handleUsername}
              />
              <TextField
              inputProps={{
                maxLength:25,

              }}
                size="small"
                sx={{ width: "70%", marginTop: "1em" }}
                id="outlined-name"
                label="Password"
                type="password"
                value={password}
                onChange={handlePassword}
              />

              <Button
              onClick={handleLogin}
                sx={{ width: "70%", marginTop: "1.5em" }}
                variant="contained"
              >
                {loggedIn ? "Sign Out" : "Login"}
              </Button>
              {errorMessage && <Alert variant="outlined" sx={{marginTop:3, marginBottom:2, }} severity="error">
        {errorMessage}
      </Alert>}
            </>
          ) : (
            <>
            <Typography gutterBottom variant="h4">
            Welcome back
          </Typography>
          <Typography gutterBottom variant="h5">
            {firstLast}
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            Role: {adminOrUser}
          </Typography>
          <Button variant="outlined" sx={{marginTop:2}}onClick={() => handleSignOut()}>LOG OUT</Button>
          </>)}
        </Box>
      </Modal>
    </Box>
  );
}
