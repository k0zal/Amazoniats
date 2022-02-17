import { render, screen, cleanup } from '@testing-library/react';
import Header from "./Header"
import userEvent from '@testing-library/user-event';
import {ContextProvider} from "../ContextProvider"
import { Component } from 'react';
import App from "../App"

describe("Header component", () => {
    const setup = () => render(<ContextProvider><Header /></ContextProvider>)

    it("Renders header without crashing", () => {
        setup()
    })

    it("Searches for item", async () => {
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