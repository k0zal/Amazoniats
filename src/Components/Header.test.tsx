import { render, screen, cleanup, waitFor } from '@testing-library/react';
import Header from "./Header"
import userEvent from '@testing-library/user-event';
import {ContextProvider} from "../ContextProvider"
import { Component } from 'react';
import Cards from './Cards';
import App from "../App"

describe("Header component", () => {
    const setup = () => render(<ContextProvider><Header /></ContextProvider>)


    it("Searches for item", async () => {
        render(<ContextProvider><Header /><Cards /></ContextProvider>)
       
        
        
        const searchInput = screen.getByLabelText("search")
        userEvent.type(searchInput, "Samsung")
        
        // const findthis = screen.getByLabelText("textinhere")
        
        screen.debug(searchInput)
        expect(screen.getByDisplayValue("Samsung")).toBeInTheDocument();
      });
})