import React from 'react';
import logo from './logo.svg';

import { createGlobalStyle } from 'styled-components';
import { ContextProvider } from "./ContextProvider"
import Cards from './Components/Cards';
import Header from "./Components/Header"
import styled from 'styled-components';
import Cart from './Components/Cart';

const Container = styled.div`
position:relative;
box-sizing:border-box;

`

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Maven Pro', sans-serif;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

function App() {
  return (
    <ContextProvider>
      <GlobalStyle/>
      <Container>
        <Cart />
<Header />
<h1 style={{margin:0,padding:0, textAlign:"center", marginTop:"1.5em"}}>Products</h1>
    <Cards/>
    </Container>
    </ContextProvider>
  );
}

export default App;
