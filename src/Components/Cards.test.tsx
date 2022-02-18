
import { render, screen, cleanup, waitFor } from '@testing-library/react';
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


      it("Adds item to cart", async () => {
        setup()

        await waitFor(() => expect(screen.getByLabelText("add1")).toBeVisible());

        const addButton = screen.getByLabelText("add1")
        userEvent.click(addButton)
        const cartFetch = JSON.parse(localStorage.getItem("Cart")!)
        expect(cartFetch.length).toBe(1)
        


      })
})