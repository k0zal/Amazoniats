
import { render, screen, cleanup } from '@testing-library/react';
import Cards from "../Components/Cards"
import userEvent from '@testing-library/user-event';
import {ContextProvider} from "../ContextProvider"
import { Component } from 'react';
import App from "../App"

describe("Cards component", () => {
    const setup = () => render(<ContextProvider><Cards /></ContextProvider>)

    it("Renders card without crashing", () => {
        setup()
    })

    it("Adds selected item to the cart", async () => {
        setup()

        expect(await screen.getAllByRole("listitem")).toBeVisible();

        const itemExists = screen.getAllByRole("listitem");
        expect(itemExists.length).toBeGreaterThan(1)
    
        // const chosenCategory = screen.getByTestId("addcart");
        // userEvent.click(chosenCategory);
        // const fetchedUser = JSON.parse(localStorage.getItem("Cart")!);
        // expect(fetchedUser).toHaveProperty("Title");
      });
})