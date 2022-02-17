import React, { useState, createContext, useEffect } from "react";
import { EnumType } from "typescript";
import { IProductItem, ICartItem } from "./Components/Item";

const Context = createContext<any>(null);

const ContextProvider = ({ children }: any) => {
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<IProductItem[]>([]);
  const [cart, setCart] = useState<ICartItem[]>([] as ICartItem[]);
  const [cartNumber, setCartNumber] = useState<number>()
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function fetchProducts(): void {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((json) => {
        const products: IProductItem[] = [];
        json.map((item: any) => {
          let product: IProductItem = {
            ID: item.id as number,
            Title: item.title as string,
            Price: item.price as number,
            Description: item.description as string,
            Category: item.category as string,
            Image: item.image as string,
            Rating: { Rate: item.rating.rate as number },
            InStock: 4,
          };
          products.push(product);
        });
        setProducts(products);
        setSearchedProducts(products);
      });
  }

  useEffect(() => {
    function checkLoggedIn() {
      const localCart = localStorage.getItem("logged");
      if (!localCart) {
        localStorage.setItem("logged", JSON.stringify(loggedIn));
      } else {
        const cartExists = JSON.parse(localStorage.getItem("logged")!);
        setLoggedIn(cartExists);
      }
    }
    checkLoggedIn();
  }, [])

  useEffect(() => {
    localStorage.setItem("logged", JSON.stringify(loggedIn))
   }, [loggedIn])

  
// switch setproducts and setsearched for filtering.
  function searchForItem(itemName: string) {
    let searched;

    if(itemName === ""){
        setProducts(searchedProducts)
    }
    const upperCaseLetter =
      itemName.charAt(0).toUpperCase() + itemName.slice(1);
    const lowerCaseAllExceptFirst = upperCaseLetter.replace(
      /\s*/g,
      function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
      }
    );

    searched = searchedProducts.filter((data: any) => {
      return data.Title.toLowerCase().includes(itemName.toLowerCase());
    });

    setProducts(searched);
    console.log(searchedProducts);
  }

  useEffect(() => {
    products.map((data: any) => {
      console.log(data);
    });
  }, [products]);

  useEffect(() => {
    function checkLocalCart() {
      const localCart = localStorage.getItem("Cart");
      if (!localCart) {
        localStorage.setItem("Cart", JSON.stringify(cart));
      } else {
        const cartExists = JSON.parse(localStorage.getItem("Cart")!);
        setCart(cartExists);
      }
    }
    checkLocalCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart))
  }, [cart]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Context.Provider
      value={{
        products,
        setCart,
        cart,
        open,
        handleOpen,
        handleClose,
        searchForItem,
        searchedProducts,
        setProducts,
        setLoggedIn,
        loggedIn
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
