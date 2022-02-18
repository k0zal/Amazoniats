import { render, screen, cleanup, waitFor } from "@testing-library/react";
import Cart from "./Cart";
import userEvent from "@testing-library/user-event";
import Cards from "./Cards";
import Header from "./Header";
import { ContextProvider } from "../ContextProvider";


describe("Cards component", () => {
  const setup = () =>
    render(
      <ContextProvider>
        <Cart />
      </ContextProvider>
    );


  it("Adding 2 to cart to use for the cart + and - test", async () => {
    render(
      <ContextProvider>
        <Cart />
        <Cards />
        <Header />
      </ContextProvider>
    );

    await waitFor(() => expect(screen.getByTestId("add1")).toBeVisible());

    const addButton = screen.getByTestId("add1");
    userEvent.dblClick(addButton);

    const cartFetch = JSON.parse(localStorage.getItem("Cart")!);
    expect(cartFetch[0].Count).toBe(2);
  });

  it("Opens cart modal to see items", async () => {
    render(
      <ContextProvider>
        <Cart />
        <Cards />
        <Header />
      </ContextProvider>
    );
    const clickModal = screen.getByLabelText("open drawer");
    userEvent.click(clickModal);
    const modal = screen.getByLabelText("modal");
    expect(modal).toBeInTheDocument;
  });

  it("Add item from cart increase count of item +1", async () => {
    render(
      <ContextProvider>
        <Cart />
        <Cards />
        <Header />
      </ContextProvider>
    );

    const clickModal = screen.getByLabelText("open drawer");
    userEvent.click(clickModal);
    
    const increaseFromCart = screen.getByLabelText("increase");
    userEvent.click(increaseFromCart);
    const cartFetch = JSON.parse(localStorage.getItem("Cart")!);
    expect(cartFetch[0].Count).toBe(3);
  });

  it("Remove item from cart decrease count of item -1", async () => {
    render(
      <ContextProvider>
        <Cart />
        <Cards />
        <Header />
      </ContextProvider>
    );

    const clickModal = screen.getByLabelText("open drawer");
    userEvent.click(clickModal);
    const modal = screen.getByLabelText("modal");
    const increaseFromCart = screen.getByLabelText("reduce");
    userEvent.click(increaseFromCart);
    const cartFetch = JSON.parse(localStorage.getItem("Cart")!);
    expect(cartFetch[0].Count).toBe(2);
  });

  it("Empties cart in one click", async () => {
    render(
      <ContextProvider>
        <Cart />
        <Cards />
        <Header />
      </ContextProvider>
    );

    const clickModal = screen.getByLabelText("open drawer");
    userEvent.click(clickModal);
    const modal = screen.getByLabelText("modal");
    const increaseFromCart = screen.getByLabelText("totalremove");
    userEvent.click(increaseFromCart);
    const cartFetch = JSON.parse(localStorage.getItem("Cart")!);
    expect(cartFetch.length).toBe(0);
  });
});
